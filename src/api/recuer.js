//递归 树状删除
export function recuer(arr,id){
    let arrList = [];
    arr.map((item, i) => {
        let itemObj = item; 
        console.log( item.id +'======'+id)
        if (item.id !== id) {
            if (item.children && item.children.length) {
                itemObj.children = recuer(item.children, id);
            }
            arrList.push(itemObj);

        }
    });
    return arrList;  
}
