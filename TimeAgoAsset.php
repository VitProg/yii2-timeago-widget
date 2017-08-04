<?php
/**
 * Created by PhpStorm.
 * User: VitProg
 * Date: 03.08.2017
 * Time: 16:11
 */

namespace vitprog\timeago;


class TimeAgoAsset extends \yii\web\AssetBundle
{
    public $sourcePath = __DIR__.DIRECTORY_SEPARATOR.'assets';
    public $js = ['timeago.js'];
    public $depends = [
        'yii\web\JqueryAsset'
    ];
}
