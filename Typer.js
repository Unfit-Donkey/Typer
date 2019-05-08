/*
    Name
    Collumns
    View
        Dark Mode
        Fullscreen
        Spellcheck
    Document
        Save
        Load
        Info
        Fontsize
    Print
        Print
        Toggle Title
        Show page separators
        Page count
 */
var DarkModeS=false;
var selection;
var pagetype=0;
var darkMode;
//Topbar inputs
    function Fullscreen(into) {
        if(into==true) {
            document.getElementById("PrintMenu").style.display="none";
            document.getElementById("PrintBack").style.display="inline";
            document.getElementById("Fullscreen").style.display="none";
            document.getElementById("previewBox").style.minHeight="100vh";
            pagetype=1;
            document.getElementById("EditCon").style.paddingTop="50px";
            for(var i=2;i<5;i++) document.getElementById("E"+i.toString()).style.borderLeft="#DDD 1px solid;";
            document.getElementById("previewBox").style.margin="0px auto";
            document.getElementById("previewBox").style.padding="0px";
            document.getElementById("previewBox").style.borderRadius="0px";
            document.getElementById("previewBox").style.width="100%";
            document.getElementById("previewBox").style.border="none";
            document.getElementById("previewBox").style.minHeight="100vh";
            document.getElementById("previewBox").onkeydown="";
            document.getElementById("Pageseparator").style.display="none";
            document.getElementById("titleToggle").style.display="none";
            document.getElementById("pages").style.display="none";
            for(var i=1;i<5;i++) document.getElementById("E"+i.toString()).style.borderLeft="";
            return;
        }
        document.getElementById("PrintMenu").style.display="inline";
        document.getElementById("PrintBack").style.display="none";
        document.getElementById("Fullscreen").style.display="inline";
        pagetype=0;
        document.getElementById("Print").title="Print";
        document.getElementById("EditCon").style.paddingTop="0px";
        document.getElementById("previewBox").style.borderRadius="10px";
        document.getElementById("previewBox").style.padding="0.4in 0.4in 0.4in 0.4in";
        document.getElementById("previewBox").style.margin="65px auto";
        document.getElementById("previewBox").style.minHeight="0px";
        document.getElementById("previewBox").style.width="8.5in";
        previewResize();
        document.getElementById("pages").style.display="inline-block";
        document.getElementById("previewBox").onkeydown=function() {setTimeout(previewResize,1)};
        document.getElementById("Pageseparator").style.display="table";
        document.getElementById("titleToggle").style.display="inline-block";
        for(var i=1;i<5;i++) document.getElementById("E"+i.toString()).style.borderLeft="none";
        
     }
    function DarkMode() {
        DarkModeS=!DarkModeS;
        if(DarkModeS==true) {
            darkMode.disabled=false;
            document.getElementById("DMB").innerHTML="Light Mode";
            document.getElementById("DMB").title="Light Mode";
        }
        else {
            darkMode.disabled=true;
            document.getElementById("DMB").innerHTML="Dark Mode";
            document.getElementById("DMB").title="Dark Mode";
        }
     }
    function Print() {
        var dark = DarkModeS;
        if(dark==true) DarkMode();
        OpenPrint()
        print();
        document.getElementById("PreviewWrapper").children[0].style.margin="65px auto";
        document.getElementById("PreviewWrapper").style.position="absolute";
        document.getElementById("PreviewWrapper").style.height="100vh";
        document.getElementById("PreviewWrapper").children[0].width="8.5in";
        document.getElementById("PreviewWrapper").children[0].style.padding="0px 50px 0px 50px";
        document.getElementById("EditCon").style.minHeight="100vh";
        document.getElementById("previewBox").style.width="8.5in";
        document.getElementById("previewBox").style.margin="65px auto";
        document.getElementById("ContBack").style.display="block";
        previewResize();
        document.getElementById("Pageseparator").style.display="table";
        if(dark==true) DarkMode();
     }
    function OpenPrint() {
        Context("None");
        document.getElementById("PreviewWrapper").style.position="static";
        document.getElementById("PreviewWrapper").style.height="auto";
        document.getElementById("PreviewWrapper").children[0].style.margin="0px";
        document.getElementById("PreviewWrapper").children[0].style.padding="0px";
        document.getElementById("previewBox").style.margin="0px";
        document.getElementById("previewBox").style.width="auto";
        document.getElementById("previewBox").style.minHeight="0px";
        document.getElementById("PreviewWrapper").children[0].width="auto";
        document.getElementById("EditCon").style.minHeight="0px";
        document.getElementById("ContBack").style.display="none";
        document.getElementById("Pageseparator").style.display="none";
    }
    function Rename(to) {
        if(to=="") to="Untitled";
        document.getElementById("Title").innerHTML=to;
        document.getElementById("PTitle").innerHTML=to;
        if(to!="Untitled") document.getElementById("Name").value=to;
        Title=to;
     }
    function ReverseSC() {
        var Titles = document.getElementsByClassName("title");
        var Text = document.getElementsByClassName("stuff");
        SpellCheck= !SpellCheck;
        for(var i=0;i<Titles.length;i++) {
            Titles[i].setAttribute("spellcheck",SpellCheck);
            Titles[i].innerHTML=Titles[i].innerHTML;
        }
        for(var i=0;i<Text.length;i++) {
            Text[i].setAttribute("spellcheck",SpellCheck);
            Text[i].innerHTML=Text[i].innerHTML;
        }
        if(SpellCheck==true) document.getElementById("SpellCheckB").innerHTML="Spell Check Off",document.getElementById("SpellCheckB").title="Turn Off Spell Check";
        if(SpellCheck==false) document.getElementById("SpellCheckB").innerHTML="Spell Check On",document.getElementById("SpellCheckB").title="Turn On Spell Check";
        
     }
    function OpenTopBar(openoclose) {

     }
    function CollumChange(num) {
        var ontype="table-cell";
        for(var i=1;i<5;i++) document.getElementById("E"+i.toString()).style.display=ontype;
        for(var i=4;i>num;i--) document.getElementById("E"+i.toString()).style.display="none";
        Collums = num;
     }
//Notes
    function AddComm() {
        var id=Date.now();
        document.getElementById("nSave").innerHTML+="<div class='CSec' id='C"+id+"'><div style='position:absolute;'><button onclick='Remove(this.parentElement.parentElement.id)' style='width:30px;height:30px;' title='Delete Note'><b>X</b></button><br><button onclick='NTags("+id+")' style='width:30px;height:30px;' id='NTB"+id+"' title='Note Tags'><b>T</b></button></div><div><b><div class='nTitle'><div id='nTitle"+id+"' class='nTitleI' contenteditable='true'></div><div class='Ntags'id='NOverTN"+id+"' style='width:100%; height:100%; display:none;'>Tags:&nbsp;&nbsp;<span contenteditable='true' class='nTagsI'></span></div></div></b><div class='nType' contenteditable='true' id='nType"+id+"'></div></div></div>";
     } 
    function GetStats() {
        var stuffe = "";
        var chars = 0;
        var words = 0;
        var para = 0;
        function replaces(stuffee){
            stuffee = stuffee.replace(/&lt;/g,"a");
            stuffee = stuffee.replace(/&gt;/g,"a");
            stuffee = stuffee.replace(/<.*?>/g," ");
            stuffee = stuffee.replace(/&nbsp;/g," ");
            return stuffee;
        }   
        for(var i=0;i<document.getElementsByClassName("Edit").length;i++) {
            stuffe=document.getElementsByClassName("Edit")[i].innerHTML;
            var parag=stuffe;
            stuffe = stuffe.replace(/<br>/g,"").replace(/&nbsp;/g,"");
            stuffe = replaces(stuffe).replace(/ {1,}/g," ");
            var word = stuffe.split(" ");
            console.log(stuffe);
            for(var x=0;x<word.length;x++) if(word[x]=="") word.splice(x,1);
            console.log(word);
            words+=word.length==1&&word[0]==""?0:word.length;     
            chars+=stuffe.replace(/ /g,"").length;
            stuffe = stuffe.replace(/<br>/g,"");
            parag = parag.replace(/&nbsp;/g,"").replace(/ /g,"");
            parag = parag.replace(/<br>/g,"").replace(/<div><\/div>/g,"<dive>");
            while(parag.includes("<dive><dive>")) parag=parag.replace(/<dive><dive>/g,"<dive>");
            parag = parag.replace(/<dive>$/,"");
            if(parag=="") para+=0;
            else para+=parag.split("<dive>").length;
        }
        var bytes = new Blob(["<!--Typer.html-->"+document.getElementById('SAVE').innerHTML+"<div style='display:none;' id='ToC'>"+document.getElementById("nSave").innerHTML+"</div><div style='display:none;'><div id='Collums'>"+Collums+"</div><div id='TITLE'>"+Title+"</div></div>"]).size;
        var num = 0;
        while(bytes>1024) bytes/=1024,num++;
        if(bytes>=100) bytes = Math.round(bytes);
        else if(bytes>=10) bytes = Math.round(bytes*10)/10;
        else bytes = Math.round(bytes*100)/100;
        document.getElementById("chars").innerHTML = "<b>"+chars.toString()+"</b> Character"+(chars==1?"":"s");
        document.getElementById("words").innerHTML = "<b>"+words.toString()+"</b> Word"+(word==1?"":"s");
        document.getElementById("para").innerHTML = "<b>"+para.toString()+"</b> Paragraph"+(para==1?"":"s");
        document.getElementById("fSize").innerHTML = "<b>"+bytes.toString()+"</b> "+"<span title='"+["Bytes","Kilobyte","Megabyte","Gigabyte","Terabyte","Petabyte","Exabyte","Zetabyte","Yottabyte"][num]+"'>"+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][num]+"</span>";
     }
    function NTags(id) {
        if(document.getElementById('NOverTN'+id.toString()).style.display=='none') {
            document.getElementById('NOverTN'+id.toString()).style.display='block';
            document.getElementById('nTitle'+id.toString()).style.display="none";
            document.getElementById("NTB"+id.toString()).style.background="#AAA";
            if(DarkModeS==true) {
                document.getElementById("nType"+id.toString()).style.color="#777";
                document.getElementById("nType"+id.toString()).style.background="#333";
                document.getElementById("NTB"+id.toString()).style.background="#484848";
            }
            else {
                document.getElementById("nType"+id.toString()).style.color="#444";
                document.getElementById("nType"+id.toString()).style.background="#666";
                document.getElementById("NTB"+id.toString()).style.background="#AAA";
            }
        } 
        else {
            document.getElementById("NTB"+id.toString()).style.background="";
            document.getElementById('NOverTN'+id.toString()).style.display='none';   
            document.getElementById('nTitle'+id.toString()).style.display="block";
            document.getElementById("nType"+id.toString()).style.color="";
            document.getElementById("nType"+id.toString()).style.background="";
        }
     }
    function nSearch(ths) {
        var ids =[];
        for(var i=0;i<document.getElementsByClassName("nTitleI").length;i++) ids[i]=document.getElementsByClassName("nTitleI")[i].getAttribute("id").replace("nTitle","").toString();
        if(ths=="") for(var i=0;i<document.getElementsByClassName("nTitleI").length;i++) {
            document.getElementById("C"+ids[i]).style.display="block";
        }
        else for(var i=0;i<document.getElementsByClassName("nTitleI").length;i++) {
            if((document.getElementsByClassName("nTitleI")[i].innerHTML.toLowerCase()+" ; "+document.getElementsByClassName("nTagsI")[i].innerHTML.toLowerCase()).includes(ths.toLowerCase())) {
                document.getElementById("C"+ids[i]).style.display="block";
            }
            else {
                document.getElementById("C"+ids[i]).style.display="none";
            }
        }
     }
    var panelname="null";
    function Open(what) {
        if(what.includes("c")) {
            panelname="null";
            document.getElementById(what.split("")[0]+"Panel").style.left="100vw";
            document.getElementById("ContBack").style.width="100vw";
            document.getElementById("PreviewWrapper").style.width="100vw";
            document.getElementById(what.split("")[0]+"Panel").style.opacity="0";
            //document.getElementById("dPanel").style.width="0vw";
            //document.getElementById("dPanel").style.opacity="0";
            document.getElementById("right").style.pointerEvents="none";
         }
        if(what.includes("o")) {
            if(panelname!="null"&&panelname!=what.split()[0]) {
                document.getElementById(panelname+"Panel").style.opacity="0";
                window.setTimeout(new Function("Open('"+panelname+"c');Open('"+what.split("")[0]+"o');"),450);
            }
            panelname=what.split("")[0];
            document.getElementById(what.split("")[0]+"Panel").style.left=document.body.clientWidth-400+"px";
            document.getElementById("ContBack").style.width=document.body.clientWidth-400+"px";
            document.getElementById("PreviewWrapper").style.width=document.body.clientWidth-400+"px";
            document.getElementById(what.split("")[0]+"Panel").style.opacity="1";
            document.getElementById("right").style.pointerEvents="auto";
         }
        GetStats();
        if(what=="nc") for(var i=0;i<document.getElementById("nSave").children.length;i++) if(document.getElementById("nSave").children[i].children[1].children[0].children[0].children[1].style.display=='block') NTags(document.getElementById("nSave").children[i].id);
     }
//Text Body
    function EditConPress(e) {
        if(e.keyCode==9){
            e.preventDefault();
            insertTab();
            getSelection().collapseToEnd();
        }
     }     
    function FixPaste() {
        for(var g=0;g<3;g++) {
            console.log("JuICE");
            var dir=document.getElementById("EditCon").firstChild.firstChild.childNodes[g];
            for(var i=0;i<dir.childNodes.length;i++) {
                dir.childNodes[i].style=false;
                //if(dir.childNodes[i].childNodes.length>1) dir.childNodes[i].outerHTML=dir.childNodes[i].innerHTML;   
            }
            dir.innerHTML=dir.innerHTML.replace(/<p.*?>/g,"<div>").replace(/<\/p>/g,"</div>").replace(/<span.*?>/g,"").replace(/<\/span>/g,"").replace(/<ul.*?>/g,"").replace(/<ol.*?>/g,"").replace(/<\/ol>/g,"").replace(/<\/ul>/g,"").replace(/<li.*?>/g,"<div>").replace(/<\/li>/g,"</div>").replace(/<label.*?>/g,"").replace(/<\/label>/g,"");
        }
     }
    function insertTab() {
        var sel, range;
        /*if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode("&emsp;"));
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = "&emsp;";
        }*/
        document.execCommand('insertHTML',false,"&emsp;");
     }
var Collums = 1;
var Saved = true;
var Title = "";
var SpellCheck = true;
function clearStyling() {
    //window.get
}
function Remove(ID) {
    var Sec = document.getElementById(ID);
    Sec.parentElement.removeChild(Sec);
 }
function Save(actual) {
    var a = document.createElement('a');
    if(document.getElementById("ToC")!=null) Remove("ToC");
    var file = 'data:text/plain;charset=utf-8,' + encodeURIComponent("<!--Typer.html-->"+document.getElementById('SAVE').innerHTML.replace(/<!--Typer.html-->/g,"")+"<div style='display:none' id='ToC'>"+document.getElementById("nSave").innerHTML+"</div><div id='Collums' style='display:none;'>"+Collums+"</div><div id='TITLE' style='display:none;'>"+Title+"</div>");
    if(actual==false) return file;
    if(document.getElementById("E1").innerHTML=="<div>Text Here...</div>") if(confirm("You are saving an empty file. Continue?")==false) return;
    a.setAttribute('href',file);
    a.setAttribute('download',document.getElementById("Title").innerHTML);
    if(document.createEvent) {
        var e=document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        a.dispatchEvent(e);
        return false;
     }
    a.click();
 }
function Load(file) {
    var reader = new FileReader();
    reader.readAsText(file,"UTF-8");
    reader.onError = function (event) {
        alert("Error reading file");
        return false;
    }
    reader.onload = function (event) {
        document.getElementById("SAVE").innerHTML = event.target.result;
        document.getElementById("nSave").innerHTML = document.getElementById("ToC").innerHTML;
        Collums=Number(document.getElementById("Collums").innerHTML);
        document.getElementById("collum").value=Number(document.getElementById("Collums").innerHTML);
        Rename(document.getElementById("TITLE").innerHTML);
        document.getElementById("ToC").parentElement.removeChild(document.getElementById("ToC"));
        document.getElementById("Collums").parentElement.removeChild(document.getElementById("Collums"));
        document.getElementById("TITLE").parentElement.removeChild(document.getElementById("TITLE"));
        previewResize();
    }
    
 }
function Context(type) {
    if(type=="None") {
        for(var i=0;i<document.getElementsByClassName("context").length;i++) document.getElementsByClassName("context")[i].style.display="none";
        return;
    }
    document.getElementById("context"+type).style.display="block";
    document.getElementById("context"+type).style.left=document.getElementById(type+"Menu").offsetLeft+"px";
 }

function previewResize() {
    if(pagetype!=0) {
        document.getElementById("Pageseparator").innerHTML="";
        return;
    }
    var inchSize=document.getElementById("inch").clientHeight;
    var spacers = 0;
    var heights=[];
    var totalheight=0;
    //TITLE total
    var total=(document.getElementById('PTitle').style.display=="none"?0:document.getElementById('PTitle').clientHeight)+(inchSize*0.4);
    var pagesmade=0;
    var column = document.getElementById("E1");
    if(column.children==null||column==null) {}
    else for(var x=1;x<column.children.length;x++) if(column.children[x]!=null) {
        if(total+column.children[x].clientHeight>=inchSize*11) pagesmade+=1,heights.push(total),total=0;
        total+=column.children[x].clientHeight;
    }
    var g=11;
    for(var i=0;i<heights.length;i++) g+=heights[i]/inchSize;
    document.getElementById("previewBox").style.minHeight=Math.ceil(g.toString()/11)*11+"in";
    document.getElementById("pages").innerHTML="<b>"+(pagesmade+1)+(pagesmade==0?" page":" pages")+"</b>";
    document.getElementById("Pageseparator").innerHTML="";
    for(var i=0;i<heights.length;i++) document.getElementById("Pageseparator").innerHTML+="<div style='height:"+heights[i]+"px;box-sizing:border-box;width:100%;' class='pageseparator'></div>";
 }
function CleanUp(nore) {
    var g=document.getElementsByClassName(nore?"nSave":"Edit");
    for(var i=0;i<g.length;i++) for(var x=0;x<g[i].childNodes.length;x++) {
        if(g[i].childNodes[x].clientHeight==undefined&&!["SUB","SUP","TABLE"].includes(g[i].childNodes[x].nodeName)) {
            var d=document.createElement("div");
            d.innerHTML=g[i].childNodes[x].nodeValue;
            document.getElementsByClassName(nore?"nSave":"Edit")[i].replaceChild(d,g[i].childNodes[x]);
        }
    }
 }
function Resize() {
    if(panelname!="null") document.getElementById(panelname+"Panel").style.left=document.body.clientWidth-400+"px";
    if(panelname!="null") document.getElementById("ContBack").style.width=document.body.clientWidth-400+"px";
    if(panelname!="null") document.getElementById("PreviewWrapper").style.width=document.body.clientWidth-400+"px";
    if(panelname!="null") document.getElementById("nSave").style.height=Math.max(window.innerHeight, document.body.clientHeight)-document.getElementById("nPanel").children[0].clientHeight+"px";
}
