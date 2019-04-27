exports.cartadd = functions.database.ref('Cart/{uid}').onWrite(event => {

    let ref = admin.database().ref('Cart/{uid}');
    return ref.once('value').then(snapshot => {
       if (snapshot.hasChildren()) {
         var total= 0;
         snapshot.forEach(function(child) {
 
            total += snapshot.val().price;
         });
        console.log(total);
       }
   });