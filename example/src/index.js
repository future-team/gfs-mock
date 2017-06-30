import Mock from '../../src/Index';
import  { Fetch }  from 'gfs-fetch';


let fetch = new Fetch(new Mock() );

fetch.run('https://e.dianping.com/actions/test/ajax.action?debug=1&_cid=1024',{
    method:'POST'
}).then(function(data){

    document.getElementById('root').innerHTML = data.description;
});