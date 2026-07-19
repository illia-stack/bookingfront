import {
    useEffect,
    useState,
    useContext
} from "react";


import {AuthContext} from "../context/AuthContext";


import {
    getPropertyComments,
    addPropertyComment
} from "./Comments.js";



export default function PropertyComments({
    propertyId
}){


const {authFetch}=useContext(AuthContext);


const [comments,setComments]=useState([]);

const [text,setText]=useState("");



async function loadComments(){

    const res =
        await getPropertyComments(
            authFetch,
            propertyId
        );


    setComments(
        res.data || []
    );

}



useEffect(()=>{

    loadComments();

},[propertyId]);





async function sendComment(){


    if(!text.trim())
        return;



    await addPropertyComment(
        authFetch,
        propertyId,
        text
    );


    setText("");

    loadComments();

}



return (

<div className="comments-section">


<h2>
Comments
</h2>


<div>

{
comments.map(c=>(

<div
key={c.id}
className="comment"
>

<strong>
{c.name}
</strong>


<p>
{c.comment}
</p>


<small>
{new Date(
c.created_at
).toLocaleDateString()}
</small>


</div>

))

}

</div>



<textarea

value={text}

onChange={
e=>setText(e.target.value)
}

placeholder="Write a comment..."

>



</textarea>



<button
onClick={sendComment}
>

Add comment

</button>


</div>

);


}