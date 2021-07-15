import React from 'react';

function Tweet(props) {

    return (
        <div className="tweet">
            <h3>{props.name ? props.name : "Tweet"}</h3>
            <p>{props.message ? props.message : "Message"}</p>
            <h3> Number of Likes: {props.numOfLikes ? props.numOfLikes : 0}</h3>
        </div>
    );
}

export default Tweet;