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

    private urlReg:RegExp;

    private localReg:RegExp;

    private isDev:boolean;

    constructor(props:MockPropsInter = {
        mockdir:'mocks',
        suffix:'.json',
        isMock:false,
        localUrlToLowerCase:true
    } ){
        //local
        this.props = props;
        this.isDev = false;
        this.urlReg = /(http)?[s]?:?\/\/[\w\.]+\.(?:com|\w){1,3}/i;
        this.localReg =  /127.0.0.1|localhost|8081|3305|3005/i;
    }

    isLocal():boolean{
        return !!this.getEnv();
    }

    getLocalUrl(url:string):string{

        url = url.replace(this.urlReg, '').split('?')[0].replace(/\.\w{1,8}/,'');

        return `${location.origin}/${this.props.mockdir}${url}${this.props.suffix}`;
    }
    getDev():boolean{
        return this.isDev;
    }
    /**
     * 获取最终的url
     * */
    getUrl(url:string ):string{

        if(this.props.isMock || this.isLocal() ){
            url =  this.getLocalUrl(url );
            this.isDev = true;
            console && console.log('[mock data]','创建本地数据链接成功！',url);
            return this.props.localUrlToLowerCase ? url.toLowerCase() : url;
        }else{
            this.isDev = false;
        }

        return url;
    }

    /**
     * 获取环境变量
     * */
    private getEnv():any{

        let location:{host:string,href:string,search:any} = window.location,
            isLocal:boolean =this.localReg.test(location.host) && location.href.indexOf('8080')<0;

        let field:boolean = (isLocal || (location.search && location.search.match('mock=1')!=null) );

        return field  ? env['Dev']:env['Pro'];//env[field ];
    }

}