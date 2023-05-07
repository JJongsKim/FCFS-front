import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import prev from '../../assets/prev.svg';
import Button from '../../components/common/Button';
import { MediumToast } from '../../components/common/Toast';
import { ACTIVE_MSG } from '../../utils/contant';

import styles from './DetailPage.module.scss';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, title, detail, num, totalNum, isAdmin } = location.state;
  const [toast, setToast] = useState(false);
  const [currentToastValue, setCurrentToastValue] = useState('');

  const handlePrevPage = () => {
    navigate(-1);
  };

  // 테스트용 동작
  const handleClickActive = () => {
    setToast(true);
    setCurrentToastValue(ACTIVE_MSG);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
        setCurrentToastValue('');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className={styles.pageWrap}>
      <span id={styles.prevBtn} onClick={handlePrevPage}>
        <img src={prev} />
        뒤로가기
      </span>
      <div id={styles.topHr} />
      <section id={styles.firstSection}>
        <div id={styles.titleText}>
          카테고리 : <p>{category}</p>
        </div>
        <div id={styles.titleText}>
          인원 :
          <p>
            {num}/{totalNum}
          </p>
        </div>
      </section>
      <section id={styles.secondSection}>
        <p id={styles.titleText}>제목</p>
        <p>{title}</p>
      </section>
      <section id={styles.thirdSection}>
        <p id={styles.titleText}>내용</p>
        <div className={styles.detailReadBox}>{detail}</div>
      </section>
      {isAdmin ? (
        <div className={styles.buttonWrap}>
          <Button size="small" color="blue">
            수정하기
          </Button>
          <Button size="small" color="blue">
            삭제하기
          </Button>
        </div>
      ) : (
        <Button size="small" color="blue" onClick={handleClickActive}>
          참여하기
        </Button>
      )}
      {toast && <MediumToast>{currentToastValue}</MediumToast>}
    </div>
  );
};

export default DetailPage;
