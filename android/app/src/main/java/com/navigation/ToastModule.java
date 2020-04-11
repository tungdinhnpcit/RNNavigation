package com.navigation;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ToastModule extends ReactContextBaseJavaModule {

    public ToastModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastExample";
    }

    @ReactMethod
    public void show() {
        Toast.makeText(getReactApplicationContext(), "Hello", Toast.LENGTH_SHORT).show();
    }

    @ReactMethod
    public void callback(Callback callback) {
        String message = new CustomView(getReactApplicationContext()).getMessage();
        callback.invoke(message);
    }
}