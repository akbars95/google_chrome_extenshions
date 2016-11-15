if(!localStorage.getItem('setPassword')){
    alert("pass - " + localStorage.getItem('setPassword'));
    localStorage.setItem('setPassword', 'value');

    alert("pass - " + localStorage.getItem('setPassword'));
}