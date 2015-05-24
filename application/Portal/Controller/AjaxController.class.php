<?php
// +----------------------------------------------------------------------
// | ThinkCMF [ WE CAN DO IT MORE SIMPLE ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013-2014 http://www.thinkcmf.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: Dean <zxxjjforever@163.com>
// +----------------------------------------------------------------------
namespace Portal\Controller;
use Common\Controller\HomeBaseController;
/**
 * ajax
*/
class AjaxController extends HomeBaseController {

	//ajax
	public function index() {
		$term=sp_get_term($_GET['fid']);
		$tplname=$term["list_tpl"];
		

    	$cid = $_GET['cid'];
    	$amount = $_GET['amount'];
    	$page = $_GET['page'];

        

		$tag='cid:'.$cid.';field:tid,post_title,post_excerpt,smeta,post_date;order:post_date DESC;limit:'.$page*$amount.','.$amount;
    	$data = sp_sql_posts($tag);
        
        foreach ($data as $k => $v) {
            $smeta = json_decode($v['smeta'], true);
            $thumb =  sp_get_asset_upload_path($smeta['thumb']);
            $data[$k]['thumb'] = $thumb;
        }
       
    	// $this->ajaxReturn($data);
        $this->ajaxReturn(array("data"=>$data,"status"=>1));


	}
	
	
	
}
