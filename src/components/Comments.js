import { API_BASE_URL } from "../config";



export async function getPropertyComments(propertyId) {

    const res = await fetch(
        `${API_BASE_URL}/property_comments.php?property_id=${propertyId}`,
        {
            credentials: "include" // keep cookies if logged in
        }
    );

    return await res.json();
}



export async function addPropertyComment(
    authFetch,
    propertyId,
    comment
){

    const res = await authFetch(

        `${API_BASE_URL}/property_comments.php`,

        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                property_id:propertyId,

                comment

            })
        }

    );


    return await res.json();

}