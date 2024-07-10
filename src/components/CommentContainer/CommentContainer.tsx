import React from 'react'
import { CommentSection } from "../../store";
import { MetaDataSchema } from '../../schema';
import Comment from "../Comment/Comment";

const CommentContainer:React.FC<{post_id:string,metaData : MetaDataSchema}> = (props) => {
  return (
    <CommentSection post_id={props.post_id} postMetaData={props.metaData}>
      <Comment/>
    </CommentSection>
  )
}

export default CommentContainer