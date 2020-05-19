import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogDbService {

  constructor(
    private afs: AngularFirestore,
    // private aFunc: AngularFireFunctions,
    private http: HttpClient
  ) {
  }

  likes$ = (docPath) => this.afs.doc<IBlogDoc>(docPath).valueChanges()
    .pipe(
      map((value) => value?.likes ?? 0),
    )


  addLike(docPath: string): Observable<{ isMax: boolean, res: any }> {

    if (this.isLocalLikesMax(docPath)) {
      return of({isMax: true, res: null});
    }
    return this.http.post<any>(`/.netlify/functions/like`, {route: docPath})
      .pipe(
        map((res) => {
          this.saveLocalLikes(docPath);
          return {
            isMax: false,
            res,
          };
        }),
      );
  }

  getLocalLikes(blogPath: string): number {
    const parsed = JSON.parse(localStorage.getItem('likedItems')) as IBlogLike;

    if (!parsed) {
      return 0;
    }

    if (parsed.hasOwnProperty(blogPath)) {
      return parsed[blogPath];
    }

    return 0;
  }

  isLocalLikesMax(blogPath: string, max = 50): boolean {
    return this.getLocalLikes(blogPath) >= max;
  }

  saveLocalLikes(blogPath: string) {
    let likes = JSON.parse(localStorage.getItem('likedItems')) as IBlogLike;

    if (!likes) {
      likes = {
        [blogPath]: 1,
      };
    } else if (likes.hasOwnProperty(blogPath)) {
      likes[blogPath] = !!likes[blogPath] ? likes[blogPath] + 1 : 1;
    } else {
      likes[blogPath] = 1;
    }

    localStorage.setItem('likedItems', JSON.stringify(likes));
  }
}

interface IBlogDoc {
  likes: number;
  data: {};
}

export interface IBlogLike {
  [path: string]: number;
}
