# gfs-mock

提供对本地环境的校验并给出对应环境请求链接！

## 安装

```

	npm install gfs-mock --save
```

## 使用

`new Mock([options,])` 

```

	var mock = new Mock({
		mockdir:'mocks', //可选 
		suffix:'.json',  //可选
		isMock:false,	//可选
		localUrlToLowerCase:true	//可选
	});
	
	//得到处理后的url
	mock.getUrl('http://www.dianping.com/test/test.action');   //本地环境将返回127.0.0.1/mocks/test/test.json
	
```

## 例子

```

	import Mock from 'gfs-mock';
    import Fetch from 'gfs-fetch';
    
    
    let fetch = new Fetch(new Mock() );
    
    fetch.run('https://e.dianping.com/actions/test/ajax.action?debug=1&_cid=1024').then(function(data){
    
        document.getElementById('root').innerHTML = data.description;
    });
    
    //得到结果
    //[page.html] 本地mock数据获取成功！
    //console.log    [mock data] 创建本地数据链接成功！ http://127.0.0.1:8081/mocks/actions/test/ajax.json
```

## Options 字段说明

`mockdir`	本地mock根路径，默认值为 'mocks'

`suffix`	本地文件后缀名，默认值为 '.json'

`isMock`	强制走本地数据，默认值为 'false'

`localUrlToLowerCase`	本地mock文件统一小写命名，默认值为 'true'

## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm start
```


