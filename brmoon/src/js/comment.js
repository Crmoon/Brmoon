const Pushtext = function(text){
    var reg=/12121/g;
    var reg1=/21212/g;
    text=text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
    text=text.replace(reg,'<pre>');
    text=text.replace(reg1,'</pre>');
    text=text.replace(/\r?\n/g,"<br/>").replace(/\s/g,"&nbsp;");
    return text;
}

export default{
    Pushtext
}