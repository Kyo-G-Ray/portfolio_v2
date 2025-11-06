// src/api/interview.ts
import { API_URL } from './base';



/**
 * Strapiからインタビューのデータを取得する関数
 * @returns インタビューデータの配列 (Promise)
 */
export async function fetchInterviews() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const API_URL = `${BASE_URL}/portfolioTable?type=interview`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}