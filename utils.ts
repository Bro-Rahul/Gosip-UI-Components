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

function SortMainComments(allComments:CommentSchema[]):CommentSchema[]{
    const mainComments:number[] = [];
    const subComments:number[] = []
    for(const comment of allComments){
        if(mainComments.length === 0){
            mainComments.push(comment.id);
            subComments.push(...comment.sub_comments);
        }else{
            if(!subComments.includes(comment.id)){
                mainComments.push(comment.id);
                subComments.push(...comment.sub_comments);
            }
        }   
    }
    const coments:CommentSchema[] = allComments.filter(comment=>mainComments.includes(comment.id));
    return coments; 
}
export {
    filterSubComments,
    SortMainComments
}