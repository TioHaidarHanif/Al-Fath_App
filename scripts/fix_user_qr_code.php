<?php

use App\Models\User;

User::whereNull('qr_code')->get()->each(function($u){
    $u->qr_code = uniqid('qr_', true);
    $u->save();
});
