<?php
namespace App\Http\Middleware;
use Closure;
class API
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next)
  {
    // dd($request);
    $response = $next($request);
    //   $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Range, Content-Disposition, Content-Description, X-Auth-Token, Authorization');
    $response->header('Access-Control-Allow-Headers', '*');

    $response->header('Access-Control-Allow-Origin', '*');
    $response->header('Access-Control-Allow-Methods', '*');
    $response->header('Access-Control-Allow-Credentials', ' true');
    //add more headers here

    // dd($response);
    if ($request->getMethod() == "OPTIONS") {
        return Response::make('OK', 200, $response);
    }
    return $response;
  }
}
