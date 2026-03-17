import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import type { Profile } from 'passport';

type StrategyDone = (error: Error | null, user?: Profile | false) => void;

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || `${API_BASE_URL}/auth/github/callback`;

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
},
    (_accessToken: string, _refreshToken: string, profile: Profile, done: StrategyDone) => {
        // 認証成功時に呼ばれる。今はそのままプロフィールを返す
        return done(null, profile);
    }
));

// ユーザー情報をセッションに保存するルール（今回は情報をまるごと保存）
passport.serializeUser((user: any, done) => {
    done(null, user);
});

// セッションからユーザー情報を取り出すルール
passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

export default passport;