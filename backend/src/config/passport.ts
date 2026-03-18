import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ENV_CONFIG } from './env.js';
import type { Profile } from 'passport';

type StrategyDone = (error: Error | null, user?: Profile | false) => void;

const GITHUB_CLIENT_ID = ENV_CONFIG.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = ENV_CONFIG.GITHUB_CLIENT_SECRET;
const API_BASE_URL = ENV_CONFIG.API_BASE_URL;
const CALLBACK_URL = ENV_CONFIG.GITHUB_CALLBACK_URL;

const GOOGLE_CLIENT_ID = ENV_CONFIG.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = ENV_CONFIG.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = ENV_CONFIG.GOOGLE_CALLBACK_URL;

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

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},
    function (request: any, accessToken: string, refreshToken: string, profile: Profile, done: StrategyDone) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        return done(null, profile);
    }
));


// ユーザー情報をセッションに保存するルール（今回は情報をまるごと保存）
passport.serializeUser((user: any, done: (err: Error | null, user?: any) => void) => {
    done(null, user);
});

// セッションからユーザー情報を取り出すルール
passport.deserializeUser((obj: any, done: (err: Error | null, user?: any) => void) => {
    done(null, obj);
});

export default passport;