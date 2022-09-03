let add = document.getElementById( "submit" );
let task = document.getElementById( "new-task" );
let tasks = document.getElementById( "tasks" );
let deletAll = document.getElementById( "delet-all" )
let allTasks = []
let overlay = document.querySelector( "#overlay-one" )
let overlayBtn = document.querySelector( "#overlay-btn" )
let overlayTwo = document.querySelector( "#overlay-two" )
let overlayBtnTwo = document.querySelector( "#overlay-button" )

if ( localStorage.getItem( "task" ) )
{
    allTasks = JSON.parse( localStorage.getItem( "task" ) )
}

add.addEventListener( "click", function ( e )
{
    e.preventDefault()
    if ( task.value !== "" && task.value.trim() !== "" )
    {
        if ( !allTasks.includes( task.value ) )
        {
            let li = document.createElement( "li" )
            li.className = "li"
            let button = document.createElement( "button" )
            let icon = document.createElement( "i" )
            let sButton = document.createElement( "button" );
            let sicon = document.createElement( "i" )
            sicon.className = "fa-solid fa-check"
            sButton.className = "waves-effect waves-light btn change"
            icon.className = "fa-solid fa-circle-xmark"
            sButton.append( sicon )
            button.className = "waves-effect waves-light btn del"
            button.append( icon )
            let newTask = document.createElement( "p" )
            let pa = task.value
            newTask.append( pa )
            task.value = ""
            li.append( newTask )
            li.append( sButton )
            li.append( button )
            tasks.append( li )
            allTasks.push( li.textContent )
            window.localStorage.setItem( "task", JSON.stringify( allTasks ) )
            deletAll.classList.add( "apear" )
        } else
        {
            overlay.classList.add( "overlay-apear" )
            task.blur()
        }
        task.value = ""
    }
    else
    {
        overlayTwo.classList.add( "overlay-apear" )
    }
} )
window.onload = function ()
{
    task.focus()
    if ( JSON.parse( localStorage.getItem( "task" ) == null ) || allTasks.length == 0 )
    {
        deletAll.classList.remove( "apear" )
    } else
    {
        deletAll.classList.add( "apear" );
        let newArr = JSON.parse( localStorage.getItem( "task" ) )
        for ( let i = 0; i < newArr.length; i++ )
        {
            let li = document.createElement( "li" )
            li.className = "li"
            let button = document.createElement( "button" )
            let icon = document.createElement( "i" )
            let sButton = document.createElement( "button" );
            let sicon = document.createElement( "i" )
            sicon.className = "fa-solid fa-check"
            sButton.className = "waves-effect waves-light btn change"
            icon.className = "fa-solid fa-circle-xmark"
            sButton.append( sicon )
            button.className = "waves-effect waves-light btn del"
            button.append( icon )
            let newTask = document.createElement( "p" )
            let newT = document.createTextNode( newArr[ i ] )
            newTask.appendChild( newT )
            li.append( newTask )
            li.append( sButton )
            li.append( button )
            tasks.append( li )
        }
    }
}

tasks.addEventListener( "click", function ( e )
{
    if ( e.target.parentElement.classList.contains( 'del' ) )
    {
        e.target.parentElement.parentElement.remove();
        for ( let i = 0; i < allTasks.length; i++ )
        {
            if ( allTasks[ i ] == e.target.parentElement.parentElement.textContent )
            {
                allTasks.splice( i, 1 )
            }
        }
        deletTask( e.target.parentElement.parentElement.textContent )
        if ( allTasks.length > 0 )
        {
            deletAll.classList.add( "apear" )
        } else
        {
            deletAll.classList.remove( "apear" )
        }
    }
} )
function deletTask( e )
{
    allTasks = allTasks.filter( ( el ) => el !== e )
    window.localStorage.setItem( "task", JSON.stringify( allTasks ) )
}
tasks.addEventListener( "click", function ( e )
{
    if ( e.target.parentElement.classList.contains( "change" ) )
    {
        e.target.parentElement.parentElement.classList.toggle( "check" )
    }
} )
deletAll.addEventListener( "click", function ()
{
    tasks.innerHTML = ""
    deletAll.classList.remove( "apear" )
    allTasks = []
    localStorage.removeItem( "task" )
    task.focus()
} )
overlayBtn.addEventListener( "click", function ()
{
    overlay.classList.remove( "overlay-apear" )
    task.focus()
} )
overlayBtnTwo.addEventListener( "click", function ()
{
    overlayTwo.classList.remove( "overlay-apear" )
    task.focus()
} )
