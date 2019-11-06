<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\UserFile;
use Storage;
use Auth;
use Hashids;

class UserFile extends Model
{
  protected $table    = 'user_files';

  protected $fillable = [
    'parent_id', 'organization_id', 'user_id', 'name', 'is_directory', 'file_type'
  ];
  public static function getFilesWithParent($request, $organizationId) {

    $parent_id = null;
    if (!empty($request->parent_id)) {
      $parent_id = $request->parent_id;
    }

    $files = UserFile::where('organization_id', $organizationId)
                ->where('parent_id', $parent_id)
                ->get();
    return $files;
  }

  public static function storeFile($request, $organizationId) {

    $user = Auth::user();
    if ($user->organization_id != $organizationId) {
        return ['status_code' => 404, 'message' => 'Invalid organization'];
    }

    $parentId = empty($request->parent_id) ? null : $request->parent_id;
    $fileType = empty($request->filetype) ? 'Folder' : $request->filetype;
    $isDirectory = empty($request->is_directory) ? false : true;

    $userFile = UserFile::where('name', $request->filename)
                    ->where('organization_id', $organizationId)
                    ->where('parent_id', $parentId)
                    ->first();

    if ($userFile) {
        return ['status_code' => 404, 'message' => 'Data already exist'];
    }
    $payload = [
      'parent_id' => $parentId,
      'organization_id' => $organizationId,
      'user_id' => $user->id,
      'name' => $request->filename,
      'file_type'=> $fileType,
      'is_directory' => $isDirectory
    ];
    $userFile = new UserFile($payload);

    if ($userFile->save() && !$isDirectory) {
        $file = file_get_contents($request->file);
        $hashedFilename = Hashids::encode($userFile->id);
        $path_file = $organizationId.'/'.$hashedFilename;
        Storage::put($path_file, $file);
    }

    return ['status_code' => 201, 'message' => $userFile];
  }

  public static function downloadFile($request, $organizationId, $fileId) {

    $user = Auth::user();
    if ($user->organization_id != $organizationId) {
        return ['status_code' => 404, 'message' => 'Invalid organization'];
    }

    $userFile = UserFile::where('organization_id', $organizationId)
                        ->where('id', $fileId)
                        ->first();


    $hashedFilename = Hashids::encode($userFile->id);
    $path_file = $organizationId.'/'.$hashedFilename;

    $response =  Storage::download($path_file, $userFile->name);

    // $response->headers->set('Access-Control-Allow-Origin' , '*');
    // $response->headers->set('Access-Control-Allow-Methods', '*');
    // $response->headers->set('Access-Control-Allow-Headers', '*');

    return $response;
  }
}
