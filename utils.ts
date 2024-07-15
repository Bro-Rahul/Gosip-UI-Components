import { CommentSchema } from "./src/schema";

function filterSubComments(allComments:CommentSchema[],comment:CommentSchema):number[]{
    if(comment.sub_comments.length === 0){
        return [];
    }
    const newList:number[] = [];
    for(const id of comment.sub_comments){
        const subComment = allComments.find(item => item.id === id);
        newList.push(...filterSubComments(allComments,subComment!));
        newList.push(id);
    }
    return newList;
}

function mainCommentsHelper(allComments:CommentSchema[],comment:CommentSchema,seenCommentList:number[],mainCommentList:number[]){
    if(!comment.sub_comments && seenCommentList.includes(comment.id)){

    }else if(!comment.sub_comments && !seenCommentList.includes(comment.id)){
        seenCommentList.push(comment.id);
        mainCommentList.push(comment.id);
    }else{
        if(!seenCommentList.includes(comment.id)){
            mainCommentList.push(comment.id);
            seenCommentList.push(comment.id);
        }
    }
    for(const id of comment.sub_comments){
        const subComment = allComments.find(com => com.id === id)!;
        seenCommentList.push(id);
        mainCommentsHelper(allComments,subComment,seenCommentList,mainCommentList);
    }
}


function mainComments(allComments:CommentSchema[]):number[]{
    const mainCommentsIdList:number[] = [];
    const visited:number[] = [];
    for(const comment of allComments){
        mainCommentsHelper(allComments,comment,visited,mainCommentsIdList);
    }
    return mainCommentsIdList;
}

function filterSubCommentsAtSingleLevel(allComments:CommentSchema[],comment:CommentSchema):CommentSchema[]{
    return allComments.filter(item=> comment.sub_comments.includes(item.id));
}

export {
    filterSubComments,
    mainComments,
    filterSubCommentsAtSingleLevel
}