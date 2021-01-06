import React from 'react';

const ListItem = ( { event }) => {
  return (
    <div>
      <p>
        {event.date}
        {event.description}
        testing
      </p>
    </div>
  )
};

export default ListItem
