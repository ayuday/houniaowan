<?php
namespace Book\Controller;
use Common\Controller\HomeBaseController; 
/**
 * 首页
 */
class IndexController extends HomeBaseController {
	
    //首页
	public function index() {
		
		if (!empty($_POST)) {
			$data['name'] = I('name');
			$data['tel'] = I('tel');
			$data['qq'] = I('qq');
			$data['booktype'] = I('booktype');
			$data['duration'] = I('duration');
			$data['arrivedate'] = I('arrivedate');
			$data['content'] = I('content');
			$data['posttime'] = time();
			$data['ip'] = get_client_ip();
			
			/*
			import('Org.Net.IpLocation');// 导入IpLocation类
			$Ip = new \Org\Net\IpLocation();// 实例化类
			
			$location = $Ip->getlocation($data['ip']); // 获取某个IP地址所在的位置
			$locationinfo = iconv('gbk','utf-8',$location['country'].$location['area']);
			$data['area'] = $locationinfo;
			*/
			
			if (M('book')->add($data)) {
				$this->success('提交成功！我们会尽快与你取得联系！');
			} else {
				$this->error('非法操作！','/',5);
			}
			
		} else {
			$this->error('非法操作！','/',5);
		}
		
    	
    }   

}


