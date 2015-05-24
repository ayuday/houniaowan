<?php
namespace Book\Controller;
use Common\Controller\AdminbaseController;
class AdminBookController extends AdminbaseController{
	
	protected $book_model;
	
	function _initialize(){
		parent::_initialize();
		//$this->book_model=D("Common/Comments");
	}

	function index($table=""){
//		$where=array();
//		if(!empty($table)){
//			$where['post_table']=$table;
//		}
//		
//		$post_id=I("get.post_id");
//		if(!empty($post_id)){
//			$where['post_id']=$post_id;
//		}
//		$count=$this->book_model->where($where)->count();
		
				
		import('Org.Net.IpLocation');// 导入IpLocation类
		$Ip = new \Org\Net\IpLocation();// 实例化类

		
		$count=M('book')->count();
		$page = $this->page($count, 20);
		
		$books=M('book')
		->limit($page->firstRow . ',' . $page->listRows)
		->order("id DESC")
		->select();
		

//		$ips=M('book')
//		->field(array('ip'))
//		->limit($page->firstRow . ',' . $page->listRows)
//		->order("id DESC")
//		->select();
//		
//		foreach ($ips as $v) {
//			echo $v;
//			$location = $Ip->getlocation($v); // 获取某个IP地址所在的位置
//			$locationinfo = iconv('gbk','utf-8',$location['country'].$location['area']);
//		}
//		
		
		
		
		
		$this->assign("books",$books);
		$this->assign("Page", $page->show('Admin'));
		$this->display(":index");
	}
	
	function delete(){
		if(isset($_GET['id'])){
			$id = intval(I("get.id"));
			if (M('book')->where("id=$id")->delete()!==false) {
				$this->success("删除成功！");
			} else {
				$this->error("删除失败！");
			}
		}
		if(isset($_POST['ids'])){
			$ids=join(",",$_POST['ids']);
			if (M('book')->where("id in ($ids)")->delete()!==false) {
				$this->success("删除成功！");
			} else {
				$this->error("删除失败！");
			}
		}
	}
	
	function check(){
		if(isset($_POST['ids']) && $_GET["check"]){
			$data["status"]=1;
				
			$ids=join(",",$_POST['ids']);
			
			if (M('book')->where("id in ($ids)")->save($data)!==false) {
				$this->success("审核成功！");
			} else {
				$this->error("审核失败！");
			}
		}
		if(isset($_POST['ids']) && $_GET["uncheck"]){
				
			$data["status"]=0;
			$ids=join(",",$_POST['ids']);
			if (M('book')->where("id in ($ids)")->save($data)!==false) {
				$this->success("取消审核成功！");
			} else {
				$this->error("取消审核失败！");
			}
		}
	}
	
}