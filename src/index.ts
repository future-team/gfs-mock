export interface MockInter{
    getUrl(url:string):string;
}

export interface MockPropsInter{
    //本地数据
    mockdir?:string;
    suffix?:string;
    isMock?:boolean;
    localUrlToLowerCase?:boolean;
}

const enum env {Pro,Dev}

export default class Mock implements MockInter{

    private props:MockPropsInter;

    constructor(props:MockPropsInter = {
        mockdir:'mocks',
        suffix:'.json',
        isMock:false,
        localUrlToLowerCase:true
    } ){
        //local
        this.props = props;
    }

    isLocal():boolean{
        return !!this.getEnv();
    }

    getLocalUrl(url:string):string{

        url = url.replace(/(http)?[s]?:?\/\/[\w\.]+\.(?:com|\w){1,3}/i, '').split('?')[0].replace(/\.\w{1,8}/,'');

        return `${location.origin}/${this.props.mockdir}${url}${this.props.suffix}`;
    }

    /**
     * 获取最终的url
     * */
    getUrl(url:string ):string{

        if(this.props.isMock || this.isLocal() ){
            url =  this.getLocalUrl(url );
            console && console.log('[mock data]','创建本地数据链接成功！',url);
            return this.props.localUrlToLowerCase ? url.toLowerCase() : url;
        }

        return url;
    }

    /**
     * 获取环境变量
     * */
    private getEnv():any{

        let location:{host:string,href:string,search:any} = window.location,
            isLocal:boolean = /127.0.0.1|localhost|8081|3305|3005/.test(location.host) && location.href.indexOf('8080')<0;

        let field:boolean = (isLocal || (location.search && location.search.match('mock=1')!=null) );

        return field  ? env['Dev']:env['Pro'];//env[field ];
    }

}