
import store from '@/common/store'
import api from '@/common/request/index'
//import pako from '@/common/pako.js'
class socket {
	constructor(options) {
		//地址
		this.socketUrl = 'wss://api.huobi.pro/ws'; //wss://api.hadax.com/ws
		this.socketStart = false;
		this.monitorSocketError();
		this.monitorSocketClose();
		this.socketReceive();
	}
	init(callback) {
		const _this = this;
		console.log(this)
				let subK = { // 订阅数据
					sub: "market.bchusdt.kline.1min",
					id: "bchusdt"
				};
			if(this.socketStart){
				console.log('webSocket已经启动了');
				//?sub=market.btcusdt.mbp.refresh.5&id=id1

				

			}else{
				uni.connectSocket({
					url: this.socketUrl,
					method: 'GET'
				});
				uni.onSocketOpen((res) => {
					this.socketStart = true;
					callback && callback();
					console.log('WebSocket连接已打开！');
					this.send(subK)
				});
				setTimeout(() => {
					_this.getHeartbeat();
				}, 5000);
			}

	}
	//Socket给服务器发送消息
	send(data, callback) {
		const _this = this;
		uni.sendSocketMessage({
			data: JSON.stringify(data),
			success: () => {
				console.log('send...')
				callback && callback(true);
			},
			fail: () => {
				callback && callback(false);
			}
		});
	}
 unzip(b64Data) {
  var strData = atob(b64Data)
  // Convert binary string to character-number array
  var charData = strData.split('').map(function(x) { return x.charCodeAt(0) })
  // Turn number array into byte-array
  var binData = new Uint8Array(charData)
  // // unzip
  var data = pako.inflate(binData)
  // Convert gunzipped byteArray back to ascii string:
  strData = String.fromCharCode.apply(null, new Uint16Array(data))
  return strData
}
	
	//Socket接收服务器发送过来的消息
	socketReceive() {
		const _this = this;
		uni.onSocketMessage(function(event) {
	let msg;
	msg=pako.inflate(event.data, {to: 'string'}) 
    msg=JSON.parse(msg)
        //if (res.data instanceof ArrayBuffer) {   //Blob

		  //console.log('收到服务器内容：', JSON.stringify(ArrayBuffer));
        //}

	if (msg.status=="ok") {
        // 如果是 ping 消息
        //_this.send(msg.ping);
    }else{
		console.log('收到服务器内容：', msg.tick.close);

		_this.acceptMessage && _this.acceptMessage(msg);
	}

				

				




				//console.log('收到服务器内容：', res.data);
				//_this.acceptMessage && _this.acceptMessage(res.data);

			
             // if(evt.data instanceof Blob){
             //    var result = '';
             //    var reader = new FileReader();
             //    reader.onload = function() {
             //         result = JSON.parse(pako.inflate(reader.result,{to:'string'}));
             //         if(result.ping){
             //            _this.send(JSON.stringify({pong:result.ping}));
             //         }
             //         console.log(result)
             //     }
             //     reader.readAsBinaryString(evt.data);
             // }
			
			
			
		});
	}
	//关闭Socket
	closeSocket() {
		uni.closeSocket();
		_this.socketStart = false;
	}
	//监听Socket关闭
	monitorSocketClose() {
		const _this = this;
		uni.onSocketClose(function(res) {
			console.log('WebSocket 已关闭！');
			_this.socketStart = false;
			setTimeout(function() {
				_this.init();
			}, 3000);
		});
	}
	//监听Socket错误
	monitorSocketError() {
		const _this = this;
		uni.onSocketError(function(res) {
			_this.socketStart = false;
			console.log('WebSocket连接打开失败，请检查！');
		});
	}
	//心跳
	getHeartbeat() {
		const _this = this;
		this.send({
			sub: "market.btcusdt.kline.1min",
			id: 'id1'
		}, (val) => {
			setTimeout(() => {
				if (val) {
					_this.getHeartbeat();
				} else {
					_this.init();
				}
			}, 10000);
		});
	}
};
const mySocket = new socket();
export default mySocket;
