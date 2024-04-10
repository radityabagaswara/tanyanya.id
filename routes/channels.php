<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('test', function ($user) {
    return true;
});

Broadcast::channel('overlay-channel.{overlay_key}', function ($overlay_key) {
    return true;
});
