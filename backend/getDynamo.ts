// src/index.ts

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import * as dotenv from 'dotenv';


// ローカル開発環境でのみ .env を読み込む
if (process.env.NODE_ENV !== 'production' && process.env.AWS_REGION === undefined) {
  dotenv.config({ path: '../.env' });
}


// 環境変数からテーブル名を取得
const tableName = process.env.TABLE_NAME;
const region = process.env.AWS_REGION; // Lambda実行環境のリージョン

// DynamoDBクライアントとDocumentクライアントの初期化
const client = new DynamoDBClient({ region: 'ap-northeast-1' });
const docClient = DynamoDBDocumentClient.from(client);

const responseExample = [
  {
    "description":"エンジニアとして就業しています。就活体験記のインタービューを受けました",
    "dataType":"work",
    "title":"会社名",
    "id":"1"
  },
  {
    "description":"テストデータ",
    "dataType":"work",
    "title":"〇〇〇〇",
    "id":"1"
  },
];

/**
 * DynamoDBから特定のdataTypeのデータを取得するLambdaハンドラ関数
 * @param event API Gatewayからのリクエストイベント（ここではパスパラメータを利用する想定）
 * @returns API Gatewayが処理できる形式のレスポンス
 */
export const handler: APIGatewayProxyHandler = async (event): Promise<APIGatewayProxyResult> => {
  // 例: リクエストパスから dataType を取得
  // ここではシンプルに、Query String Parameter の 'type' から取得すると仮定
  const dataType = event.queryStringParameters?.type; 

  if (!tableName || !dataType) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "TABLE_NAME または dataType が指定されていません。" }),
    };
  }

  // DynamoDB Query Commandの作成
  const command = new QueryCommand({
    TableName: tableName,
    // パーティションキー (dataType) を指定
    KeyConditionExpression: "dataType = :dt", 
    ExpressionAttributeValues: {
      ":dt": dataType,
    },
    // ソートキー(id)で昇順に並べる (デフォルト)
    ScanIndexForward: true, 
  });

  try {
    // DynamoDBからデータを取得
    const response: QueryCommandOutput = await docClient.send(command);

    // 成功レスポンス
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // CORS設定 (フロントエンドからのアクセスを許可)
        "Access-Control-Allow-Origin": "*", 
      },
      body: JSON.stringify(response.Items || []), // Itemsは取得したデータ配列
    };

  } catch (error) {
    console.error("DynamoDB Query Error:", error);

    // エラーレスポンス
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "データの取得中にエラーが発生しました。", error: (error as Error).message }),
    };
  }
};


// https://nknasnkuc6.execute-api.ap-northeast-1.amazonaws.com/table