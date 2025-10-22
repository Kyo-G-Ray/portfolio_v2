
import { getUrl } from '@aws-amplify/storage';



/**
 * S3から署名付き画像URLを非同期で取得する
 * @param fileName S3に保存されているファイルのキー（ファイル名）
 * @param accessLevel アクセスレベル ('public', 'protected', 'private')
 * @returns 画像の署名付きURL、またはエラー時に null
 */


export const getImageUrl = async (fileName: string, accessLevel: 'public' | 'protected' | 'private' = 'public') => {
  try {
    // V6では、getURLのオプションに level の代わりに accessLevel を設定し、
    // ファイルパス全体を path に指定します。
    // Storage.get() とほぼ同じ動作をします。
    const { url } = await getUrl({
      path: fileName, // ファイル名（キー）
      options: {
        accessLevel: accessLevel,
        region: 'ap-northeast-1',
        // 必要に応じて有効期限（expiresIn: 3600 など）を設定可能
      }
    });
    

    // getUrl の戻り値は { url: URL } オブジェクトなので、URLオブジェクトの toString() で文字列URLを返す
    return url.toString(); 

  } catch (error) {
    console.error("Failed to get image URL:", error);
    return null; 
  }
};



