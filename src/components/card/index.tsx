import React, {FC} from 'react';
import { Link } from 'gatsby';
import Tags from '../tags';

import './card.scss';

export interface ICardProps {
  title: string;
  description?: string | null;
  date?: string;
  url: string;
  isUrlExternal?: boolean;
  image?: string;
  tags?: string[] | null;
  isSearchableTags?: boolean;
}


const Card: FC<ICardProps> = (props: ICardProps) => {
  const {
    title,
    date,
    url,
    description = "No Description Given",
    tags = ["No Tags"],
    isUrlExternal = false,    
  } = props;

  if(isUrlExternal) {
    return (
      <a href={url} className="card" rel="noreferrer noopener">
        {!!date ? <span className="card--subtitle">{date}</span> : null}
        <h3 className="card--title">{title}</h3>
        <p className="card--body">{description}</p>
        <div className="card--spacer"></div>
        <Tags tags={tags} />
      </a>
    )
  }
  return (
    <Link className="card" to={url}>
      <span className="card--subtitle">{date}</span>
      <h3 className="card--title">{title}</h3>
      <p className="card--body">{description}</p>
      <div className="card--spacer"></div>
      <Tags tags={tags} />
    </Link>
  )
  // <Link to={url}>Go to Post</Link>
}

export default Card;
