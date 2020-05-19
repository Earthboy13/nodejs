const deleteProduct = btn => {
    const id = btn.parentNode.querySelector('[name=id]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const product = btn.closest('article');

    fetch('/admin/products/' + id, {
        method: 'DELETE',
        headers:{
            'csrf-token': csrf
        }
    }).then(Response => {
        console.log(Response);
        if(Response.status == 204)
            product.parentNode.removeChild(product);
        else
            return result.json();
    }).then(data => {
        console.log(data);
        
    })
    .catch(err => console.log(err));

};