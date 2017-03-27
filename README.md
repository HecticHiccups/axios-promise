# axios-promise

# What are Promises? <br>
Promises are an alternative way of making HTTP requests.<br>
They are more organized then regular requests, and are currently the go to alternative for surviving callback hell.


## Example:
```javascript
 axios.get('ENDPOINT')
   .then((res) => {
    //Do this
 })
   .catch((err) => {
    console.error(err); //catching any errors.
})
```
