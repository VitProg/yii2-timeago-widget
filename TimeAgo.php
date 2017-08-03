<?php
/**
 * Created by PhpStorm.
 * User: VitProg
 * Date: 23.11.2015
 * Time: 0:51
 */

namespace vitprog\timeago;


use yii\base\Widget;
use yii\helpers\Html;
use yii\web\View;

class TimeAgo extends Widget {

    public $dateTime;
    public $text = '';
    public $options = [];

    public function run() {
        if ($this->dateTime == null) {
            $this->dateTime = time();
        }

        if (is_string($this->dateTime)) {
            $this->dateTime = new \DateTime($this->dateTime);
        }

        $options = $this->options;
        if (empty($options['class'])) {
            $options['class'] = 'auto-timeago';
        } else {
            $options['class'] = 'auto-timeago ' . $options['class'];
        }

        $options['datetime'] = \Yii::$app->formatter->asDatetime($this->dateTime, 'php:c');
        $options['timestamp'] = strtotime($options['datetime']);//is_integer($this->dateTime) ? $this->dateTime : strtotime($this->dateTime);

        $this->view->registerJs('setTimeout(initTimeAgo, 100);', View::POS_READY, get_called_class());
        return Html::tag('time', $this->text, $options);
    }


}