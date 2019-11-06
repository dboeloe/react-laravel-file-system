<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use JWTAuthException;
use Storage;


class UserController extends Controller
{
  private function getToken($email, $password)
  {
    $token = null;
    //$credentials = $request->only('email', 'password');
    try {
        if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
            return response()->json([
                'response' => 'error',
                'message' => 'Password or email is invalid',
                'token'=>$token
            ]);
        }
    } catch (JWTAuthException $e) {
        return response()->json([
            'response' => 'error',
            'message' => 'Token creation failed',
        ]);
    }
    return $token;
  }

  public function login(Request $request)
  {
    $user = User::where('email', $request->email)->get()->first();
    if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
    {
        $token = self::getToken($request->email, $request->password);
        $user->auth_token = $token;
        $user->save();
        $response = [
            'success'=>true,
            'data' =>
                [
                    'id'=>$user->id,
                    'auth_token'=>$user->auth_token,
                    'name'=>$user->name,
                    'email'=>$user->email,
                    'organization_id' => $user->organization_id
                    ]
                ];
    }
    else
      $response = ['success'=>false, 'data'=>'Record doesnt exists'];

    return response()->json($response, 201);
  }

  public function register(Request $request)
  {

    $organization = new \App\Organization();
    $organization->save();

    $payload = [
      'password'=>\Hash::make($request->password),
      'email'=>$request->email,
      'name'=>$request->name,
      'organization_id' => $organization->id,
      'auth_token'=> ''
    ];

    $user = new User($payload);
    if ($user->save()) {
      $token = self::getToken($request->email, $request->password); // generate user token

      if (!is_string($token)) {
        return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
      }

      $user = \App\User::where('email', $request->email)->get()->first();
      $user->auth_token = $token; // update user token
      $user->save();

      Storage::makeDirectory($user->organization_id);
      $response = [
          'success'=>true,
          'data' => [
            'name'=>$user->name,
            'id'=>$user->id,
            'email'=>$request->email,
            'auth_token'=>$token,
            'organization_id' => $user->organization_id
            ]
          ];
    } else {
      $response = ['success'=>false, 'data'=>'Couldnt register user'];
    }

    return response()->json($response, 201);
  }

  public function testPost($request) {

    $response = ['success'=>false, 'data'=>'Couldnt register user'];
    return response()->json($response, 201);
  }
}
