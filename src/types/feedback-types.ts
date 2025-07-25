/* 意見回饋相關類型 */

// 回饋詳情的共通類型
export interface FeedbackDetailData {
  id: number,
  title: string,
  content: string,
  status: 0 | 1,
  status_display: string,
  created_at: string,
  updated_at: string,
}

// 網站回覆詳情
export interface FeedbackWebDetailData extends FeedbackDetailData {
  name: string,
  email: string,
}

// 社群通報詳情
export interface FeedbackCommunityDetailData extends FeedbackDetailData {
  name: string,
  unit_first: string,
  unit_second: string,
  unit_third: string,
}
