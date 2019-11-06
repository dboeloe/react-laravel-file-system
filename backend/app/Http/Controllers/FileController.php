<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use App\UserFile;
use JWTAuth;
use JWTAuthException;
use Storage;

class FileController extends Controller {

  public function getFiles(Request $request, $organizationId) {
    $files =  UserFile::getFilesWithParent($request, $organizationId);
    // dd($files);
    return response()->json($files, 200);
  }

  public function storeFile(Request $request, $organizationId) {
    $store = UserFile::storeFile($request, $organizationId);

    return response()->json($store, $store['status_code']);
  }

  public function getFile(Request $request, $organizationId, $fileId) {
    $store = UserFile::downloadFile($request, $organizationId, $fileId);

    // dd($store);
    // return response()->download($store)
    return $store;
  }
}
