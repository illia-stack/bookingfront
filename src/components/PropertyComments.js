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

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";



export default function PropertyComments({
    propertyId
}){


const {authFetch}=useContext(AuthContext);


const [comments,setComments]=useState([]);

const [text,setText]=useState("");

const { lang } = useLanguage();


async function loadComments(){

   const res = await getPropertyComments(propertyId);


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

    <h2>{translations[lang].comments}</h2>

    <div className="comments-list">
      {comments.length > 0 ? (
        comments.map((c) => (
          <div
            key={c.id}
            className="comment-card"
          >
            <strong>{c.name}</strong>

            <p>{c.comment}</p>

            <small>
              {new Date(c.created_at).toLocaleDateString()}
            </small>
          </div>
        ))
      ) : (
        <p className="no-comments">
          {translations[lang].noComments}
        </p>
      )}
    </div>

    <div className="comment-form">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={translations[lang].writeComment}
      />

      <button onClick={sendComment}>
        {translations[lang].addComment}
      </button>

    </div>

  </div>
);

}