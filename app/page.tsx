"use client";

import Image from "next/image";
import type { FormEvent } from "react";

export default function Home() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const plan = formData.get("plan") as string;
    const phone = formData.get("phone") as string;

    alert(
      `预约已记录：\n称呼：${name}\n手机号：${phone}\n套餐：${plan}\n我们会尽快联系你。`,
    );

    form.reset();
  };

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-top reveal">
          <div className="brand">HOME CAT CARE</div>
          <div className="chip">可预约 · 当天回传喂养记录</div>
        </div>
        <div className="hero-grid">
          <div>
            <h1 className="reveal delay-1">
              你不在家时，
              <br />
              猫也该被认真照顾
            </h1>
            <p className="lead reveal delay-2">
              上门喂猫、清洁猫砂、互动陪伴、健康观察，一次服务完成。适合出差、旅行和节假日临时托管需求。
            </p>
            <div className="actions reveal delay-3">
              <a className="btn primary" href="#booking">
                立即预约
              </a>
              <a className="btn" href="#plans">
                查看套餐
              </a>
              <a className="btn" href="#store-location">
                门店位置
              </a>
            </div>
          </div>
          <div className="photo-card reveal delay-2">
            <div className="photo" aria-label="上门喂猫场景图" />
          </div>
        </div>
      </header>

      <section id="service">
        <h2>服务内容</h2>
        <div className="grid-3">
          <article className="panel">
            <h3>基础喂养</h3>
            <p>
              按你的喂养计划执行主粮、零食与饮水补充，支持定时器、湿粮开罐等细节操作。
            </p>
          </article>
          <article className="panel">
            <h3>环境清洁</h3>
            <p>
              清理猫砂盆、补充猫砂，处理常见掉毛区域，保持猫咪活动区整洁舒适。
            </p>
          </article>
          <article className="panel">
            <h3>陪玩观察</h3>
            <p>
              15-20 分钟互动，观察精神状态、进食与排泄情况，并给你发送图文回传。
            </p>
          </article>
        </div>
      </section>

      <section id="plans">
        <h2>套餐与价格</h2>
        <div className="grid-3">
          <article className="panel">
            <h3>单次到家</h3>
            <div className="price">¥89</div>
            <p>适合短期离家，1 次上门服务，含喂养+清洁+回传。</p>
          </article>
          <article className="panel">
            <h3>连续三天</h3>
            <div className="price">¥249</div>
            <p>每日 1 次上门，支持固定时间段，适合周末旅行。</p>
          </article>
          <article className="panel">
            <h3>连续七天</h3>
            <div className="price">¥559</div>
            <p>高频照顾更安心，支持定制重点观察项目。</p>
          </article>
        </div>
      </section>

      <section id="booking">
        <div className="form-wrap">
          <h2>预约登记</h2>
          <form id="bookingForm" onSubmit={handleSubmit}>
            <label>
              你的称呼
              <input type="text" name="name" placeholder="例如：王女士" required />
            </label>
            <label>
              联系电话
              <input
                type="tel"
                name="phone"
                pattern="^1\\d{10}$"
                placeholder="11位手机号"
                required
              />
            </label>
            <label>
              服务套餐
              <select name="plan" required>
                <option value="">请选择套餐</option>
                <option value="single">单次到家 ¥89</option>
                <option value="3days">连续三天 ¥249</option>
                <option value="7days">连续七天 ¥559</option>
              </select>
            </label>
            <label>
              服务地址
              <input type="text" name="address" placeholder="请填写到小区/楼栋" required />
            </label>
            <label>
              补充说明
              <textarea
                name="note"
                placeholder="猫咪习惯、喂食禁忌、上门时间偏好等"
              />
            </label>
            <button className="btn primary" type="submit">
              提交预约
            </button>
            <div className="meta">
              提交后将由人工 10 分钟内联系确认（演示页面，不会真实发送数据）。
            </div>
          </form>
        </div>
      </section>

      <section id="store-location">
        <h2>门店位置</h2>
        <div className="location-wrap">
          <Image
            className="location-map"
            src="/assets/store-map-cute.png"
            alt="喂猫宠物店位置地图，位于杭州市大江东新湾路并驱街口"
            width={1200}
            height={900}
          />
          <article className="panel location-card">
            <h3>喂猫宠物店</h3>
            <p className="address-line">
              地址：杭州市大江东新湾路并驱街口（新湾路与并驱街交叉口附近）
            </p>
            <p>
              地图内已用宠物爪印图钉标注“我们的宠物店（喂猫宠物店）”，到店可直接按图导航。
            </p>
            <div className="map-tip">营业时间：09:30 - 21:30（建议到店前电话确认）</div>
          </article>
        </div>
      </section>

      <section>
        <div className="split">
          <article className="panel">
            <h2>服务流程</h2>
            <p>
              1. 提交预约信息并确认时间
              <br />
              2. 首次沟通喂养习惯与注意事项
              <br />
              3. 准时上门执行服务并实时回传
              <br />
              4. 服务结束后发送完整记录
            </p>
          </article>
          <article className="panel">
            <h2>保障说明</h2>
            <p>
              全程实名认证；服务前后拍照记录；支持指定门锁/钥匙交接方式；若遇突发情况，第一时间电话联系。
            </p>
          </article>
        </div>
      </section>

      <section id="reviews">
        <h2>客户评价</h2>
        <div className="reviews">
          <article className="review-card">
            <div className="review-stars" aria-label="五星好评">
              ★★★★★
            </div>
            <p>
              第一次找上门喂猫，过程非常细致，猫砂和水盆都处理得很干净，还会主动发视频，特别安心。
            </p>
            <div className="review-photo-wrap">
              <Image
                className="review-photo"
                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1000&q=80"
                alt="客户晒图：猫咪在沙发上休息"
                fill
                sizes="(max-width: 960px) 100vw, 30vw"
              />
            </div>
            <div className="review-name">周小姐 · 连续三天</div>
          </article>
          <article className="review-card">
            <div className="review-stars" aria-label="五星好评">
              ★★★★★
            </div>
            <p>
              猫咪有点怕生，服务师会慢慢引导互动，第二天就愿意靠近了，回传记录也很完整，五星推荐。
            </p>
            <div className="review-photo-wrap">
              <Image
                className="review-photo"
                src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1000&q=80"
                alt="客户晒图：猫咪在窗边玩耍"
                fill
                sizes="(max-width: 960px) 100vw, 30vw"
              />
            </div>
            <div className="review-name">林先生 · 连续七天</div>
          </article>
          <article className="review-card">
            <div className="review-stars" aria-label="五星好评">
              ★★★★★
            </div>
            <p>
              临时出差当天就约到了，喂食按备注执行得很到位，每次上门后都及时反馈，体验超预期。
            </p>
            <div className="review-photo-wrap">
              <Image
                className="review-photo"
                src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?auto=format&fit=crop&w=1000&q=80"
                alt="客户晒图：猫咪趴在猫爬架上"
                fill
                sizes="(max-width: 960px) 100vw, 30vw"
              />
            </div>
            <div className="review-name">陈女士 · 单次到家</div>
          </article>
        </div>
      </section>

      <footer>喂猫到家 · 服务时段 08:00-22:00 · 覆盖主城区（可扩区）</footer>
    </div>
  );
}
