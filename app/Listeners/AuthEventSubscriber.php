<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\Failed;
use App\Models\UserActivity;
use Illuminate\Support\Facades\Request;

class AuthEventSubscriber
{
    public function handleLogin(Login $event)
    {
        UserActivity::create([
            'user_id' => $event->user->id,
            'action' => 'login',
            'resource_type' => 'auth',
            'resource_id' => $event->user->id,
            'old_data' => null,
            'new_data' => null,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }

    public function handleLogout(Logout $event)
    {
        UserActivity::create([
            'user_id' => $event->user->id,
            'action' => 'logout',
            'resource_type' => 'auth',
            'resource_id' => $event->user->id,
            'old_data' => null,
            'new_data' => null,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }

    public function handleFailed(Failed $event)
    {
        UserActivity::create([
            'user_id' => null,
            'action' => 'failed_login',
            'resource_type' => 'auth',
            'resource_id' => null,
            'old_data' => null,
            'new_data' => json_encode(['credentials' => $event->credentials]),
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
        ]);
    }

    public function subscribe($events)
    {
        $events->listen(Login::class, [self::class, 'handleLogin']);
        $events->listen(Logout::class, [self::class, 'handleLogout']);
        $events->listen(Failed::class, [self::class, 'handleFailed']);
    }
}
