import React from 'react';
import ListItem from './ListItem.jsx'

const List = ( { data } ) => {
  return (
    <div>
      {data.map((event, i) =>
        <ListItem key={i} event={event} />
      )}
    </div>
  );
};

export default List

