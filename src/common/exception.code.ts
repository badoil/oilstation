export const ExceptionCode = {
  ////// SUCCESS ///////
  ////// SUCCESS ///////
  SUCCESS: '성공',
  SUCCESS_SAVE: '저장되었습니다.',
  SUCCESS_UPDATE: '수정되었습니다.',
  ////// FAIL /////////
  //sample
  sample_max: '10이상 입력할 수 없습니다.',
  sample_name: '이름은 필수 입력입니다.',
  //COMMON
  FAIL_DUPLICATE_ID: '중복된 아이디가 있습니다.',
  ERROR: '서버에서 오류가 발생하였습니다.',
  UPLOADERROR: '최대 이미지 크기가 초과 하였습니다.',
  FAIL_DELETE: '삭제를 실패하였습니다.',
  //login
  NOT_JOIN: '가입여부를 확인해주세요.\n등록된 정보가 없습니다.',
  CHECK_EMAIL: '이메일을 정확히 입력해주세요.',
  NULL_PASSWORD: '비밀번호를 입력해주세요.',
  WRONG_PASSWORD: '비밀번호가 틀렸습니다.',
  CHECK_ID_PASSWORD: '아이디 또는 비밀번호를 확인 후 다시 입력해 주세요.',
  IS_APPROVAL_STATE_NO: '계정 미승인 유저입니다.',
  IS_APPROVAL_STATE_CANCEL: '계정 정지된 유저입니다.',
  JOIN_ERROR:
    '회원가입중 서버 오류 발생 하였습니다. 다시 시도해주시기 바랍니다.',
  TOKEN_EXPIRED: '토큰이 만료 되었습니다.',
  DUPLICATE_EMAIL: '이미 사용중인 이메일 입니다.',
  DUPLICATE_DI: '기존 가입정보가 있습니다.',
  //join
  JOIN_CHECK_EMAIL: '이메일 형식이 잘못 되었습니다.',
  JOIN_CHECK_EMAIL_BILL: '계산서 이메일 형식이 잘못 되었습니다.',
  JOIN_DUPLICATE_ID: '이미 사용중인 아이디입니다.',
  //AUTH
  NO_AUTH: '권한이 없습니다.',
  // DELIVERY
  DELIVERY_NOT_FOUND: '배송정보를 찾을수 없습니다.',
  DELIVERY_NOT_FOUND_FILE: '파일을 업로드 해주세요.',
  DELIVERY_SAVE_FAIL: '배송정보 저장중 오류가 발생했습니다.',
  // FAVORITEAREA
  FAVORITEAREA_MAX_SIZE: '{0}건 이상 선택하였습니다.',
  FAVORITEAREA_MAX_QUANTITY: '배송 수량 최대 {0}건 입니다.',
  //RIDER
  NOT_RIDER: '라이더를 찾을 수 없습니다.',
  //MANAGER
  MANAGER_NOT_FOUND: '해당회원의 정보를 찾을수 없습니다.',
  // BOARD
  QNA_NOT_FOUND: 'QNA를 찾을수 없습니다.',
  //HUB
  HUB_NOT_FOUND: '거점 정보를 찾을수 없습니다.',
};
