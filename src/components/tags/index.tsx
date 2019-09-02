import React, {FC} from 'react';
import './tags.scss'
import { join } from 'path';

export interface ITagProps {
  /**  tags are comma separated string */
  tags: string[] | null;
}

const Tags: FC<ITagProps> = (props: ITagProps ) => {
  const { tags } = props;
    return (
      <span className="tags-container">
        {!!tags ? tags.map((tag, idx) => (
          <span
            key={idx}
            className="tag"
          >
            {tag.trim()}
          </span>
        )) : null}
      </span>
    )
}

export default Tags;
