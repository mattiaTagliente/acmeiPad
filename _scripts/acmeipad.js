        //**************
        //tabbed iframes
        //**************
            
        // store the pad names
        var groupList = ["Team"];
        var userList = ["Enzo", "Angelo", "Ubaldo", "Mattia", "Fabio", "Nicola", "Cinzia", "Peppino", "Damati"];
        // store the server domain    
        var serverDomain;
            
        // declare globals to hold all the links and all the panel elements    
        var tabLinks;
        var tabPanels;
                       
        function emptyElement(elementId){
            ele=document.getElementById(elementId);
            while(ele.hasChildNodes())
                ele.removeChild(ele.firstChild);
        }
        function setSource(padName){
            // get url info
            var serverDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
            // create the SRC for the iframe
            var source = serverDomain + ":9001/p/" + padName + "?" + "showChat=false&showLineNumbers=false&useMonospaceFont=true&noColors=true&lang=it";
            // return the source for the iframe
            return source
        }
        function makeUL(array,name,listClass,listId,href) {
            // Create the list element:
            var list = document.createElement('ul');
            // Assign the list name:
            list.id = name;
            for(var i = 0; i < array.length; i++) {
                // Create the list item:
                var item = document.createElement('li');
                // Create the anchor item:
                var anchor = document.createElement('a');
                // Create the anchor name:
                var anchorName = array[i];
                // Create the anchor text:
                if (array.length < 2) {
                    var anchorText = document.createTextNode(array[i]);
                }else{
                    var string=array[i]
                    var splitted = string.split("", 1);
                    var anchorText = document.createTextNode(splitted);
                }
                // Set the anchor title:
                anchor.title = array[i];
                // Append the anchor text:
                anchor.appendChild(anchorText);
                // Set the anchor reference:
                anchor.href = "#"+href.toString()+i.toString();
                // Append the anchor to the list item:
                item.appendChild(anchor);
                // Set the anchor class:
                item.className = listClass.toString();
                // Set the anchor id:
                item.id = listId.toString()+i.toString();
                // Add the item to the list:
                list.appendChild(item);
            }
            // Finally, return the constructed list:
            return list;
        }
        function makeIframes(usersArray) {
        var list = document.createElement('ul');
        list.id = "padsUl";
        for (var i=0; i < usersArray.length; i++) {
            // create the item for the list
            var item = document.createElement('li');
            // set the class for the item
            item.className = "padsItem";
            // set the id for the item
            item.id = "pad"+i.toString();
            // create the title for the iframe
            var title = document.createElement('h2');
            // set the class for the title
            title.className = "padName";
            // create the text for the title
            var titleText = document.createTextNode(usersArray[i]);
            // append the title text
            title.appendChild(titleText);
            // append the title to the item
            item.appendChild(title);
            // set the id for the title
            title.id = "padTitle"+(i+1).toString();
            // create the iframe
            var pad = document.createElement('iframe');
            // set the class for the iframe
            pad.className = "padsIframe";
            // set the id for the iframe
            pad.id = "padsIframe"+(i+1).toString();
            // retrieve the server domain and port
            var serverDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
            // create the SRC for the iframe
            var source = serverDomain + ":9001/p/" + usersArray[i] + "?" + "showChat=false&showLineNumbers=false&useMonospaceFont=true&noColors=true&lang=it";
            // set the source for the iframe
            pad.src = source;
            // append the iframe to the container
            item.appendChild(pad);
            // append the item to the container
            list.appendChild(item);
            }
            // return the container list
            return list;
        }
        function makeTabs(usersArray) {
        document.getElementById('tabs').appendChild(makeUL(usersArray,"tabsUl","padTab","tab","pad"));
        }            
        function makePads(usersArray) {
            document.getElementById('pads').appendChild(makeIframes(usersArray));
        }
        function displayPanel(tabToActivate) {
            // go through all the <li> elements
            for (var i = 0; i < tabLinks.length; i++) {
                if (tabLinks[i] == tabToActivate) {
                    // if it's the one to activate, change its class
                    tabLinks[i].classList.add("active");
                    // and display the corresponding panel
                    tabPanels[i].style.display = "block";
                } else {
                    // remove the active class on the link
                    tabLinks[i].classList.remove("active");
                    // hide the panel
                    tabPanels[i].style.display = "none";
                }
            }
        }
            
        window.onload=function() {
            // create the pads' name object //todo
            // createPadsNameObject(groupList, userList); //todo
            
            // make sure there is no crap around in the tabs div
            emptyElement("tabs");
            
            // create the navigation tabs
            makeTabs(userList);
            
            // create the pads
            makePads(userList);
            
            // set the Team pad src
            document.getElementById("padIframe0").src = setSource("Team");
        
            // grab the li elements
            tabLinks = document.getElementById("tabs").getElementsByTagName("li");
            // Now get all the tab panel container divs
            tabPanels = document.getElementById("padsUl").getElementsByTagName("li");
            // activate the _first_ one
            displayPanel(tabLinks[0]);            

            // attach event listener to links using onclick and onfocus, fire the displayPanel function, return false to disable the link
            for (var i = 0; i < tabLinks.length; i++) {
                tabLinks[i].onclick = function() { 
                    displayPanel(this); 
                    return false;
                }
                tabLinks[i].onfocus = function() { 
                    displayPanel(this); 
                    return false;
                }
            }
        }