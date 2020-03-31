---
title: A Beginners Intro to RxJS with Examples
date: 2020-03-20T02:09:13.779Z
image: 'https://media.calebukle.com/uploads/Rx_Logo-512-512.png'
description: The RxJS library can be seen as intimidating or confusing initially. Here I
  hope to demystify and help you understand the core concepts of the library to
  make awesome reactive applications. 
publish: true
tags:
  - RxJS
  - Beginner
---
## What is RxJS?

RxJS, reactive extensions for JavaScript, is a library to help build applications in a reactive programming style through the observable pattern. If you're unfamiliar with the library, check out my post about RxJS for Beginners

## ...Okay, so what does that mean?

It allows you to build systems in a *reactive* way, which is to say *when something happens, other things happen.*You can think of a system in a cause and effect type way.

## Why should I use it?

RxJS is a tool, and every tool has a time and place to be used. RxJS excels at event handling, building reactive UIs, and generally piping data around.

## Neat! How do I use it?

First, we need to learn some terminology.

* **Observable**: The concept of containing your data, I like to call it the observable stream.
* **Observer**: The object that contains the callbacks for when events happen
* **Subscription**: What is returned from subscription to an observable.
* **Piping** or **Transforming**: The act of taking the data contained in the stream and doing something with it.
* **Subject**: A special observable that allows you to send data to everyone who is subscribed to an observable;

I like to think of the observable as a stream of water, and things that move with the stream, say small origami boats, as the data in the stream. When you do work on the stream, you are piping or transforming the data into the shape you want at the end, where your subscriber has asked for the data.

Let's take a look at some code

## Get your hands dirty

```javascript
import { Observable } from 'rxjs';

const myObservable$ = new Observable(subscriber => {

  subscriber.next(1);

  subscriber.next(2);

  subscriber.next(3);

  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 2000);

});

const mySubscription = myObservable$.subscribe(
  (result) => console.log(result),
  (error) => console.error(error),
  () => console.log("observable completed")
);
```

This code calls 1, 2, 3 synchronously then waits 2 seconds before calling 4, and completing.

Let's break this code down.

We create a new observable assign it to `myObservable$`

Note: using a `$` is my way to signify a variable is an observable stream but is not required. Use what coding standards work for you/your team.

`subscriber` contains 3 methods we want to focus on.

* .next()
* .complete()
* .error()

`.next()` emits the *next* value to the subscribers. `.complete()` tells the subscriber that it's done sending values. `.error()` tell the subscriber that an error occurred.

The important thing to note here is nothing will happen with the observable we set up until we call `.subscribe` on the observable.

There are a matching 3 callbacks on the passed in the subscribe method.

the first being what function runs when `.next()` is called.

Next, is when `.error()` is called. This is where you could handle your errors.

Finally, `.complete()` tells the subscriber that it's done, this is a great place to place your *teardown logic.*

An important thing is when `complete()` and `error()` is called the observable is unsubscribed from.

Check out this sandbox to try out that example,

Things to try:

* 🤔 Uncomment the `.error()` call on line 8, what happens with the output?
* 🤔 What is the output if you don't subscribe to the observable?
* 🤔 What order is shown in the console if you uncomment line 12?

[https://stackblitz.com/edit/rxjs-step-1?embed=1&file=index.ts]([https://stackblitz.com/edit/rxjs-step-1?embed=1&file=index.ts])

Whoa, hold on a second there...

## What's Unsubscribing

Unsubscribing is a way for the subscriber to tell the observable that it's no longer listening for values.

🤔 What values are shown in the console if you uncomment line 21?

You should see value 4 never arrives.

If the observable never completes and the subscriber never unsubscribes, then the observable will stay active. This can cause memory leaks so it's important to unsubscribe to observables you are no longer using.

Note, when `error()` is called the observable emits the error then completes.

You most likely won't create new Observables by hand typically they will come from Subjects or events.

## Understanding Subjects

<https://stackblitz.com/edit/rxjs-step-2?embed=1&file=index.ts>

Subjects are best thought of as a way emit events out to multiple subscribers. Let's hop in the code to explain things.

```javascript
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs'; 

const mySubject$ = new Subject();
const myObservable$ = mySubject$.asObservable();
const mySecondObservable$ = mySubject$.asObservable();

myObservable$.subscribe(
  (nextValue) => console.log('first observable', nextValue),
  (error) => console.error('first observable', error),
  () => console.log('first observable completed')
)

mySubject$.next(1);
mySubject$.next(2);
mySubject$.next(3);
setTimeout(() => {
  mySubject$.next(4);
  mySubject$.complete();
});

mySecondObservable$.subscribe(
  (nextValue) => console.log('second observable', nextValue),
  (error) => console.error('second observable', error),
  () => console.log('second observable completed')
);
```

That code looks very similar, and in fact is does almost the exact same as the previous example. Let's walk though the differences.

We make a new subject instead of observable. and call a method `asObservable()` which returns an observable we can subscribe to. 

we make two observables to subscribe to one before and one after we call `.next()`. `.next()` sends the next value on the subject. we call next 3 times then use a timeout to send another value in a couple of seconds. 

We then subscribe to another variable but look at what is in the console, the first 3 values aren't there for the second subscription. This is because an observable has to be subscribed to before it will start receiving values. You'll notice that the second observable does receive the last value though because of the async nature of timeout, allowing the observable to subscribe before the last value is sent. 

Subjects are very handy for multicasting data around your application. Think of an event bus, where events are sent via `next()` and any part of your application that needs to listen for events on that bus can just subscribe when they need it. Handy!

Now, what if we wanted to send the previous values from the subject to subscribers who need that history? 

That's where Stateful Subjects come in! 

## Stateful Subjects

Stateful subjects are just stateful observables, meaning they are aware of previous/current value/values that were emitted. This makes them great for managing the state of local components, or even entire applications; though, you should choose the correct tool depending on your application's need for managing state.

There are three main stateful subjects,

* Behavior Subject
* Replay Subject
* Async Subject

We are only going to focus on Behavior and Replay Subject, for now, just know that AsyncSubjects only send values once completed.

Behavior Subjects require an initial value to send to subscribers,

```javascript
const myBehaviorSub = new BehaviorSubject(null);

const myObsOne$ = myBehaviorSub.asObservable();

myObsOne$.subscribe(res => console.log(res));

myBehaviorSub.next(1);
myBehaviorSub.next(2);
myBehaviorSub.next(3);
```

In this example, `myObs$` is going to log null immediately, then 1, 2, 3. Now, what if we add another subscriber after the thrid value being emitted?

```javascript
const myBehaviorSub = new BehaviorSubject(null);

const myObsOne$ = myBehaviorSub.asObservable();
const myObsTwo$ = myBahaviorSub.asObservable();

myObsOne$.subscribe(res => console.log(res));

myBehaviorSub.next(1);
myBehaviorSub.next(2);
myBehaviorSub.next(3);

myObsTwo$.subscribe(res => console.log(res));
```

We get a 3 in the console. Nice! we now are getting the current value emitted in the Behavior Subject. Now you understand what a Behavior Subject does. It will send the current value to any new subscribers that come allow. Great for initializing part of your application with the current state of something.  

## Replay Subject

The name says it all, this special subject*replays*values from the subject's history, not just the current value like Behavior Subject.

Relay subjects take a number that says how many values to buffer or save into its history. For any new subscribers, they will receive all the values in the buffer immediately and any future values as they are sent.

> Quick Tip: setting the buffer to one is pretty much like making a Behavior subject without having to send a null value.

```javascript
const myReplaySub = new ReplaySubject(3);
const myObs$ = myReplaySub.asObservable();
const myObsTwo$ = myReplaySub.asObservable();

myObs$.subscribe(res => console.log(res));

myReplaySub.next(1);
myReplaySub.next(2);
myReplaySub.next(3);
myReplaySub.next(4);

myObsTwo$.subscribe(res => console.log(res));
```

Notice how `myObs$` just receives values as they are sent like any subject and `myObsTwo$` only receives 2,3,4 once it subscribes, but we never sent those values are it was subscribed. it was pulled from the history of `myReplaySub` specifically the last 3 values that we told it to.  What if we change the buffer size to 2? We should only see 3 and 4 come through. 

Alright, let's learn how to get the common types of data and events into streams. 



## Getting Existing Data into Observables

There are a handful of utility functions RxJS provides to turn data info streams. These are the ones we'll going to go over.

* `from()`
* `of()`
* `fromEvent()`
* `timer()`
* `interval()`

First, `from()` is great for converting promises into observables such as when using the fetch API. It can also emit values in a sequence when an array or iterable is passed in as well.

```javascript
const source = from([1,2,3]);
source.subscribe(res => console.log(res));
```

> If you pass a string into `from()` it will emit for each character in the string. Try it out!


Next, `of()` will variables in the sequence passed in, the variables passed in can be primitives, like numbers, strings, booleans, or a function, or object, etc. 

```javascript
const source = of(1,2,3, true, "abc");
source.subscribe(res => console.log(res));
```

A very handy function is `fromEvent()` as the name implies this is for converting events into an observable stream such as clicks on an element. _fromEvent_ takes a target element such as `document` and the event name to listen for. 
```javascript
const events = fromEvent(document, 'click')
events.subscribe(event => console.log(event));
```
Finally, timers and intervals work in similar fashions, emitting on defined schedules. The difference being if you'd want an initial emission to happen or after a specified time. timers emit after a given time and emit numbers after the passed in time. 

```javascript
const source = timer(1000, 2000)
source.subscribe(tick => console.log(tick));
```

The timer will tick after 1 second then every 2 seconds emit a new value indefinitely. You can pass in 0 as the first argument to make the timer tick right away instead of waiting for the initial second. Optionally you can not pass in the second argument and have the timer only tick once then complete. 

For intervals, you can emit numbers based on a time frame. 
```javascript
const source = interval(1000);
source.subscribe(tick => console.log(tick));
```

With an interval the initial value isn't emitted initially, it will wait for that time to elapse once before the first value is emitted.  

So if you need an initial emission or only want a single fire, then use a timer, if you just need a constant tick then use an interval. 

Now that you know how to get data from existing types and events into observables, let's learn how to do work on those streams. 

## Operate on Streams (aka piping)

It's all starts with a method on all observables called `pipe()`. The pipe method takes functions called operators that do work on our stream. RxJS comes with a large assortment of operators built in for almost every situation, but you can make custom operators if the built-in ones don't meet your needs, but that's for another blog post. Let's stick to the basics for now. 

### Map
```javascript
const source = from([1,2,3,4,5]);
source
	.pipe(
		map(values => {
			return value * 2;
			})
		)
		.subscribe(res => console.log(res);
```

First, don't worry about the `from([1,2,3,4])` this is just an RxJS method that will return that array as individual emissions. Think of it as calling `.next()` on a subject like before. Just there to get data into an observable stream. The real importance is right below that line. 

So what we have here is us calling `.pipe()` which passes our data into our map function, which iterates over each value in the stream, then multiplies that value by 2 and returns the result of that calculation. So when we see the log in the subscribe method we get 2, 4, 6, 8, 10. 

What happens if instead of numbers we pass in an array? 🤔
```javascript 
 const source = from([ [1, 2, 3], [10,20,30], [100, 200, 300] ]);
```
We can't directly just multiply by 2 as we now have an array. This is important, map does not iterate over the values inside each emitted item, but the item in the stream. Think of it as picking up the values, in this case, an array of numbers, in the stream and placing them into a function. If we wanted the same behavior as before we'd need to use the `Array.map()` inside the map operator.

```javascript 
const source = from([ [1, 2, 3], [10,20,30], [100, 200, 300] ]);

const example = source
  .pipe(
    map(values => {
      console.log(values);
      return values.map(value => {
        return value * 2;
      })
    })
  )
  .subscribe(res => console.log(res));
```
> Now I'm choosing to be explicit about the returns, to make follow what is happening easier. If you're comfortable with implicit returns, by all means, use them. 

### Filter

Using filter prevents the value from proceeding down the stream if the condition is evaluated to false. In our example, we filter out any odd values from our stream. 


```javascript
const source = from([1,2,3,4,5]);
const example = source 
    .pipe(
        filter(values => values % 2)
    ) 
    .subscribe(res => console.log(res));
```

The filter operator is ideal for preventing progression of values. An example is displaying a list of events streaming in from an external source. These events have a type, say _important_ and _normal_. We old want to show the _important_ events. so we use `filter(event => event.type === important)` to only allow our desired events through. 

### Tap

The tap operator can be though of as _a way to peer_ in to an stream like tapping into an already existing pipe. Tap does not affect the stream in any way it is just a window into the stream. This makes `tap()` ideal for creating side effects and debugging your stream. 

```javascript
const source = from([1,2,3,4,5]);
const example = source 
    .pipe(
        tap(values => console.log('tapped', values),
        filter(values => values % 2)
    ) 
    .subscribe(res => console.log(res));
```

### SwitchMap
Here's a problem, how do I take a stream and start another stream say making an http call every 10 seconds. The initial thought is to just subscribe/do work inside inside in your subscription method. 

```javascript
const timer$ = interval(1000 * 10);

timer$
  .subscribe(_ => {
    // don't do this
    fetch('someUrl')
      .then(r => console.log(r)
  })
    
```

You should instead use one of the transformational operators such as `switchMap()`. 

```javascript
const timer$ = interval(1000 * 10);

timer$
  .pipe(
    switchMap(_ => {
      return fetch('someUrl')
    })
  )
  .subscribe(r => {
    console.log(r)
  })
```

Now we are changing or switching streams to the fetch request. this allows for an easier management of streams. instead of stopping and starting streams you should _route_ streams into others and operate on the new streams. There are several transforming operators, but `switchMap` will probably be one of the most commonly used. 


## Wrap Up
I greatly enjoy RxJS and I recommend you try it too! The library is very daunting and complex, but taking it one operator at a time and giving them a try. It's okay if you don't understand parts of the library. I still don't know everything about RxJS. You'll get into the groove of your common operators, map, switchMap, filter, tap. You'll start using basic Subjects, then BehaviorSubjects. Adopting small parts of the library is the easiest way to ease into the library. Also, the official [documentation](https://rxjs.dev/api) isn't the easiest way to learn. Check out my preferred resources below. 

## Resources
Here are my favorite resources for RxJS
- [https://www.learnrxjs.io/](https://www.learnrxjs.io/)
- [https://reactive.how/](https://reactive.how/)
