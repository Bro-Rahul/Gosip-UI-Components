import React from 'react'
import { postEmoji } from '../../assets'


const PostEmoji: React.FC = () => {
    return (
        <div className='post-container'>
            <h2>Did you like it?</h2>
            <p>97 Response</p>
            <div className='emoji-container'>
                {postEmoji.map(image => (
                    <div key={image.alt}>
                        <img src={image.src} alt={image.alt} />
                        <i>1</i>
                        <p>{image.alt}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostEmoji