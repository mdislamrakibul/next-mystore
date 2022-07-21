
$(document).ready(function ()
{
    // alert("jdfhasjkdhfs")
})
var options1 = {

}
var options2 = {

}
var options3 = {

}
document.addEventListener('DOMContentLoaded', function ()
{
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options1);
});
// document.addEventListener('DOMContentLoaded', function ()
// {
//     var elems = document.querySelectorAll('.dropdown-trigger');
//     var instances = M.Dropdown.init(elems, options2);
// });
document.addEventListener('DOMContentLoaded', function ()
{
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options2);
});

document.addEventListener('DOMContentLoaded', function ()
{
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options3);
});