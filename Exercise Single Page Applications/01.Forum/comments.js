export async function getCommentById(id) {

    let request = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`)

    if(request.ok){
        let data = await request.json();
        console.log(data);
    } else {
        alert("Something went wrong!");
    }
}