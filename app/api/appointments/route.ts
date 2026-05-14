import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type AppointmentInput = {
  name: string;
  phone: string;
  email?: string;
  plan: string;
  appointmentTime: string;
  address: string;
  note: string;
};

type AppointmentRow = {
  id: string;
  user_name: string | null;
  user_phone: string | null;
  user_email: string | null;
  appointment_time: string | null;
  remark: string | null;
  created_at: string | null;
  form_data: Record<string, unknown> | null;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isString = (value: unknown): value is string => typeof value === "string";

const isAppointmentInput = (value: unknown): value is AppointmentInput => {
  if (!isObject(value)) return false;
  return (
    isString(value.name) &&
    isString(value.phone) &&
    (value.email === undefined || isString(value.email)) &&
    isString(value.plan) &&
    isString(value.appointmentTime) &&
    isString(value.address) &&
    isString(value.note)
  );
};

const isNullableString = (value: unknown): value is string | null =>
  value === null || typeof value === "string";

const isAppointmentRow = (value: unknown): value is AppointmentRow => {
  if (!isObject(value)) return false;
  return (
    isString(value.id) &&
    isNullableString(value.user_name) &&
    isNullableString(value.user_phone) &&
    isNullableString(value.user_email) &&
    isNullableString(value.appointment_time) &&
    isNullableString(value.remark) &&
    isNullableString(value.created_at) &&
    (value.form_data === null || isObject(value.form_data))
  );
};

const sendNotifyEmail = async (appointment: AppointmentRow) => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPortRaw = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyTo = process.env.APPOINTMENT_NOTIFY_TO;

  if (!smtpHost || !smtpPortRaw || !smtpUser || !smtpPass || !notifyTo) {
    throw new Error("缺少 SMTP 配置，请检查环境变量");
  }

  const smtpPort = Number.parseInt(smtpPortRaw, 10);
  if (Number.isNaN(smtpPort)) {
    throw new Error("SMTP_PORT 不是有效数字");
  }

  const smtpSecure =
    process.env.SMTP_SECURE === "true" || (process.env.SMTP_SECURE !== "false" && smtpPort === 465);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const formData = (appointment.form_data ?? {}) as Record<string, unknown>;
  const planCode = typeof formData.plan === "string" ? formData.plan : "";
  const planLabelMap: Record<string, string> = {
    single: "单次到家 ¥89",
    "3days": "连续三天 ¥249",
    "7days": "连续七天 ¥559",
  };
  const planLabel = planLabelMap[planCode] ?? "未填写";

  const address = typeof formData.address === "string" ? formData.address : "";
  const note = typeof formData.note === "string" ? formData.note : "";
  const appointmentTimeDisplay = appointment.appointment_time
    ? new Date(appointment.appointment_time).toLocaleString("zh-CN", {
        hour12: false,
        timeZone: "Asia/Shanghai",
      })
    : "";

  const createdAtDisplay = appointment.created_at
    ? new Date(appointment.created_at).toLocaleString("zh-CN", {
        hour12: false,
        timeZone: "Asia/Shanghai",
      })
    : "";

  await transporter.sendMail({
    from: smtpUser,
    to: notifyTo,
    subject: "新预约上门喂猫通知",
    text: [
      "【新预约上门喂猫通知】",
      "",
      "预约信息",
      `- 预约编号：${appointment.id}`,
      `- 提交时间：${createdAtDisplay}`,
      "",
      "客户信息",
      `- 称呼：${appointment.user_name ?? ""}`,
      `- 联系电话：${appointment.user_phone ?? ""}`,
      `- 联系邮箱：${appointment.user_email ?? ""}`,
      "",
      "服务信息",
      `- 套餐代码：${planCode}`,
      `- 套餐名称：${planLabel}`,
      `- 服务地址：${address}`,
      `- 备注：${appointment.remark ?? note}`,
      `- 上门时间：${appointmentTimeDisplay}`,
      "",
      "请尽快联系客户确认具体上门安排。",
    ].join("\n"),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif; color: #1f2937; line-height: 1.6;">
        <h2 style="margin: 0 0 12px; color: #111827;">新预约上门喂猫通知</h2>
        <p style="margin: 0 0 16px;">收到一条新的预约，请及时跟进确认。</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
          <tbody>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb; width: 140px;">预约编号</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.id}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">提交时间</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${createdAtDisplay}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">称呼</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.user_name ?? ""}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">联系电话</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.user_phone ?? ""}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">联系邮箱</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.user_email ?? ""}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">套餐代码</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${planCode}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">套餐名称</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${planLabel}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">服务地址</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${address}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">备注</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointment.remark ?? note}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #e5e7eb;">上门时间</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${appointmentTimeDisplay}</td></tr>
          </tbody>
        </table>
        <p style="margin: 16px 0 0;">请尽快联系客户确认具体上门安排。</p>
      </div>
    `,
  });
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!isAppointmentInput(body)) {
      return NextResponse.json({ error: "请求参数不合法" }, { status: 400 });
    }

    const appointmentTime = new Date(body.appointmentTime);
    if (Number.isNaN(appointmentTime.getTime())) {
      return NextResponse.json({ error: "上门时间格式不合法" }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "缺少 Supabase 配置" }, { status: 500 });
    }

    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/appointments?select=id,user_name,user_phone,user_email,appointment_time,remark,created_at,form_data`,
      {
        method: "POST",
        headers: {
          accept: "application/vnd.pgrst.object+json",
          apikey: supabaseAnonKey,
          authorization: `Bearer ${supabaseAnonKey}`,
          "content-profile": "public",
          "content-type": "application/json",
          prefer: "return=representation",
        },
        body: JSON.stringify({
          user_name: body.name,
          user_phone: body.phone,
          user_email: email === "" ? null : email,
          appointment_time: appointmentTime.toISOString(),
          remark: body.note,
          form_data: {
            name: body.name,
            phone: body.phone,
            email,
            plan: body.plan,
            appointmentTime: appointmentTime.toISOString(),
            address: body.address,
            note: body.note,
          },
        }),
      },
    );

    if (!insertResponse.ok) {
      const errorPayload = (await insertResponse.json().catch(() => ({}))) as {
        code?: string;
        message?: string;
      };
      return NextResponse.json(
        {
          error: errorPayload.message ?? "预约写入失败",
          code: errorPayload.code,
          status: insertResponse.status,
        },
        { status: 502 },
      );
    }

    const inserted = (await insertResponse.json()) as unknown;
    if (!isAppointmentRow(inserted)) {
      return NextResponse.json({ error: "预约写入成功但返回数据异常" }, { status: 500 });
    }

    await sendNotifyEmail(inserted);

    return NextResponse.json({ success: true, appointmentId: inserted.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
