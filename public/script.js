
$(document).ready(function ()
{
    // alert("jdfhasjkdhfs"
    $(".dropdown-trigger").dropdown();
    $('.tabs').tabs();
})
var options1 = {

}
var options2 = {

}
var options3 = {

}
var options4 = {

}
var options = {
    swipeable: true
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
document.addEventListener('DOMContentLoaded', function ()
{
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options4);
});

// var instance = M.Tabs.getInstance(elem);
// var instance = M.Tabs.init(el, options);